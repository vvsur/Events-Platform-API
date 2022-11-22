import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenPayload } from '../entities/token-payload.entity';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectKnex() private readonly knex: Knex) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: TokenPayload) {
    const foundUser = await this.knex('users')
      .where({ email: payload.email })
      .first();

    if (foundUser) {
      return foundUser;
    }
  }
}
