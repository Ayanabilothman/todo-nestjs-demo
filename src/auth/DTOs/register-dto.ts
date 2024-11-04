import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  profilePicture: string;

  @IsOptional()
  @ApiProperty()
  provider: Record<string, any>;
}

export class RegisterDTO extends CreateUserDTO {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/, {
    message:
      'Your password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and spaces. Please try again.',
  })
  @ApiProperty()
  password: string;
}
