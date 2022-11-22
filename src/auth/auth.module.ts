import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { Jwt2faStrategy } from "./jwt-2fa/jwt-2fa.strategy";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
import { MailService } from "../mail/mail.service";

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, Jwt2faStrategy, MailService],
})
export class AuthModule { }
