import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      global: true,

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT.JWTsecret'),
        signOptions: {
          expiresIn: configService.get('JWT.JWTExpireTime'),
        },
      }),

      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
