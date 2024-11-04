import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema.js';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (configService: ConfigService, jwtService: JwtService) => {
          const schema = userSchema;
          schema.methods.checkPassword = function (password: string): boolean {
            return bcrypt.compareSync(password, this.password);
          };

          schema.methods.generateToken = async function () {
            return await jwtService.signAsync({
              id: this.id,
              email: this.email,
            });
          };

          schema.pre('save', function (next) {
            if (!this.isModified('password')) return next();
            const salt = configService.get('saltRound');
            this.password = bcrypt.hashSync(this.password, salt);
            return next();
          });

          return schema;
        },
        inject: [ConfigService, JwtService],
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
