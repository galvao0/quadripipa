import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service.js';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: JwtStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: 'flamengo',
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: { sub: string }) {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      type: user.type,
      emailVerified: user.emailVerified,
    };
  }
}
