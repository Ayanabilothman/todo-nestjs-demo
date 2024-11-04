import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly _ConfigService: ConfigService) {
    super({
      clientID: _ConfigService.get('google.clientID'),
      clientSecret: _ConfigService.get('google.clientSecret'),
      callbackURL: _ConfigService.get('google.callbackURL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails, picture } = profile;
    const user = {
      provider: { name: 'google', id },
      email: emails[0].value,
      username: displayName,
      profilePicture: picture,
    };

    done(null, user);
  }
}
