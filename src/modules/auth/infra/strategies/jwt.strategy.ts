import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { envConfig } from 'src/core/config/env/env.config';
import { UserPayload } from 'src/shared/interfaces/user-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: envConfig.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return {
      uuid: payload.uuid,
      name: payload.name,
      email: payload.email,
      character: payload.character,
      role: payload.role,
      status: payload.status,
    };
  }
}
