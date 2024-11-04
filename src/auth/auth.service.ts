import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO, RegisterDTO } from './DTOs/register-dto';
import { UserDocument } from 'src/user/user.schema';
import { LoginDTO } from './DTOs/login-dto';

import { generateHTML } from 'src/utils/htmlTemplate';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _UserService: UserService,

    private readonly _ConfigService: ConfigService,
    private readonly _JWTService: JwtService,
  ) {}

  async register(body: RegisterDTO): Promise<UserDocument> {
    const user = await this._UserService.create(body);
    const token = await user.generateToken();
    this._UserService.sendEmail({
      to: user.email,
      subject: 'Account Acctivation',
      html: generateHTML(token),
    });

    return user;
  }

  async verifyToken(token: string): Promise<{ id: string; email: string }> {
    const payload = await this._JWTService.verifyAsync(token, {
      secret: this._ConfigService.get('JWT.JWTsecret'),
    });
    return payload;
  }

  async activateAccount(token: string) {
    const payload = await this.verifyToken(token);
    return this._UserService.update(payload.id, { accountActivated: true });
  }

  async login(body: LoginDTO): Promise<{ token: string }> {
    const user = await this._UserService.findByEmail(body.email);
    if (!user) throw new NotFoundException('User not found!');
    if (!user.accountActivated)
      throw new BadRequestException('Account is not activated yet!');

    if (!user.checkPassword(body.password))
      throw new BadRequestException('Invalid Password!');
    const token = await user.generateToken();

    return { token };
  }

  async googleLogin(user: CreateUserDTO): Promise<{ token: string }> {
    const userExist = await this._UserService.findByEmail(user.email);
    if (!userExist) {
      const newUser = await this._UserService.create(user);
      const token = await newUser.generateToken();
      return { token };
    }
    const token = await userExist.generateToken();
    return { token };
  }
}
