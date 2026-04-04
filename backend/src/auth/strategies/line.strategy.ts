import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-line-auth';
// auth/strategies/line.strategy.ts
@Injectable()
export class LineStrategy extends PassportStrategy(Strategy, 'line') {
  constructor() {
    super({
      channelID: process.env.LINE_CLIENT_ID,
      channelSecret: process.env.LINE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/line/callback',
      scope: ['profile', 'openid', 'email'],
    });
  }

  async validate(accessToken, refreshToken, params, profile) {
    return {
      lineId: params.id,
      email: params.email ?? null,
      displayName: params.displayName,
      pictureUrl: params.pictureUrl,
    };
  }
}
