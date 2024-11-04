import * as FileType from 'file-type';
import { BadRequestException, FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces/file.interface.js';
import { readFileSync } from 'fs';

export type FileTypeValidatorOptions = {
  allowedFileTypes: string[];
};

export class FileTypeValidator extends FileValidator<FileTypeValidatorOptions> {
  async isValid(
    file?: IFile | IFile[] | Record<string, IFile[]>,
  ): Promise<boolean> {
    if (!this.validationOptions) return true;
    if (!file) throw new BadRequestException('File is missing!');
    const type = await this.getFileType(file['path']);
    return this.validationOptions.allowedFileTypes.includes(type);
  }

  buildErrorMessage(file: any): string {
    return `Invalid File Format (expected one of the following MIME types: ${this.validationOptions.allowedFileTypes.join(
      ', ',
    )})`;
  }

  private async getFileType(path: string) {
    const buffer = readFileSync(path);
    const { mime } = await FileType.fromBuffer(buffer);
    return mime;
  }
}
