import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
