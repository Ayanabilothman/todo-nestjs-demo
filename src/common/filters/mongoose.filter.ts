import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error, MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status: number, error: string, message: string;
    switch (exception.name) {
      case 'ValidationError':
        const errors = Object.values(exception.errors).map(
          (err: any) => err.message,
        );
        status = HttpStatus.BAD_REQUEST;
        message = `Validation failed: ${errors.join(', ')}`;
        error = 'Bad Request';
        break;

      case 'CastError':
        console.log('casting');
        status = HttpStatus.BAD_REQUEST;
        message = `Invalid ${exception.kind}: ${exception.value} for field ${exception.path}`;
        error = 'Bad Request';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Unknown error occurred';
        error = 'Internal server error';
        break;
    }

    if (exception.code === 11000) {
      const field = Object.keys(exception.keyValue)[0];
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate key error: The value for the field "${field}" already exists.`,
        error: 'Conflict',
      });
    }

    return response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
