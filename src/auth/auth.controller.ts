import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDTO } from './DTOs/register-dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTOs/login-dto';
import { MongoExceptionFilter } from 'src/common/filters/mongoose.filter';
import { ErrorInterceptor } from 'src/common/interceptors/test';
import { GoogleAuthGuard } from './gurads/google-oauth.gurad';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('/register')
  @UsePipes(ValidationPipe)
  @UseFilters(MongoExceptionFilter)
  async register(@Body() body: RegisterDTO) {
    return this._authService.register(body);
  }

  @Get('/activate')
  activateAccount(@Query('token') token: string) {
    return this._authService.activateAccount(token);
  }

  @Post('/login')
  login(@Body() body: LoginDTO) {
    return this._authService.login(body);
  }

  @Get('/google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req) {
    const token = await this._authService.googleLogin(req.user);
    return token;
  }
}
