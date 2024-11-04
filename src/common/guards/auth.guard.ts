import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGurad implements CanActivate {
  constructor(
    private readonly _UserService: UserService,
    private readonly _AuthService: AuthService,
    private readonly _ConfigService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this._AuthService.verifyToken(token);

      const { id, email } = await this._UserService.findById(payload.id);

      request.user = { id, email };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private getToken(request: Request): string | undefined {
    const [key, token] = request.headers['authorization']?.split(' ') ?? [];

    return key === this._ConfigService.get('tokenType') ? token : undefined;
  }
}
