import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(@InjectKnex() private readonly knex: Knex) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    const foundUser = await this.knex('users')
      .where({ email: payload.email })
      .first();

    if (!foundUser.twofa_enabled) {
      return foundUser;
    }
    if (payload.isTwoFactorAuthenticated) {
      return foundUser;
    }
  }
}
