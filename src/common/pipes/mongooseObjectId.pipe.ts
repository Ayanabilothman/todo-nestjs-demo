import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongooseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('Invalid Id!');

    return value;
  }
}
