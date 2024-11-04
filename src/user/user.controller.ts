import {
  Controller,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import storage from 'src/utils/diskStorage';
import { User } from 'src/common/decorators/user.decorator';
import { ObjectId } from 'mongoose';
import { AuthGurad } from 'src/common/guards/auth.guard';
import { FileTypeValidator } from 'src/common/file validators/fileType.validator';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileDto } from './dtos/file-dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly _UserService: UserService) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileDto,
  })
  @UseInterceptors(FileInterceptor('image', { storage }))
  @ApiBearerAuth()
  @UseGuards(AuthGurad)
  addProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ allowedFileTypes: ['image/png'] }),
        ],
      }),
    )
    file: Express.Multer.File,
    @User('id') id: ObjectId,
  ) {
    return this._UserService.addPicture({ path: file.path, userId: id });
  }
}
