import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
