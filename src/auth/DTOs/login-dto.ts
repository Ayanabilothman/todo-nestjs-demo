import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginDTO {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/, {
    message:
      'Your password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and spaces. Please try again.',
  })
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
