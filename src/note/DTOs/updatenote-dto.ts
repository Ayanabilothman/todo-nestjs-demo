import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  content: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isCompleted: boolean;
}
