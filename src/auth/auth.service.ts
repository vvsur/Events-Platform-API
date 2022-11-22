import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import usersJson from 'src/users/users.json';
import { hashPassword, verifyPassword } from '../db/utils/password';
import { Account, AccountLogin } from '../db/dto/knex';
import { InjectKnex, Knex } from 'nestjs-knex';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { MailService } from '../mail/mail.service';

const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  private code;

  constructor(
    @InjectKnex() private readonly knex: Knex,
    private mailerService: MailerService,
    private jwtService: JwtService,
    private maileService: MailService,
  ) {
    this.code = Math.floor(10000 + Math.random() * 90000);
  }

  private users: User[] = users;

  async register(createUserInput: RegisterDto): Promise<AuthResponse> {
    const user: User = {
      id: uuidv4(),
      ...users[0],
      ...createUserInput,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const { name, email, password } = user;

    const hashpassword = hashPassword(password as string);

    const userDb: Account | undefined = await this.knex('users')
      .where({ email })
      .first();

    if (userDb) {
      return {
        token: 'jwt token',
        permissions: ['super_admin', 'user'],
      };
    } else {
      this.users.push(user);
      await this.knex('users').insert({
        email,
        password: hashpassword,
        name,
        permission: 'user',
      });

      return {
        token: 'jwt token',
        permissions: ['super_admin', 'user'],
      };
    }
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.knex('users').where({ email }).first();
    try {
      // Of course, we should consider encrypting the password
      const isMatch = pass === user.password;
      if (user && isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } catch (e) {
      return null;
    }
  }

  async login(loginInput: LoginDto): Promise<any> {
    const { password, email } = loginInput;
    const hashpassword = hashPassword(password as string);
    const foundUser: Account | undefined = await this.knex('users')
      .where({ email })
      .first();

    if (foundUser) {
      if (verifyPassword(password, foundUser.password)) {
        let permissions = [];
        permissions.push(foundUser.permission);
        const payload = { email: foundUser.email, permissions };

        return {
          email,
          token: this.jwtService.sign(payload),
          permissions,
        };
      } else {
        return new HttpException(
          'Please varify your account',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async loginWithTwoFA(userWithoutPsw: Partial<User>) {
    const payload = {
      email: userWithoutPsw.email,
      isTwoFactorAuthenticationEnabled: !!userWithoutPsw.twofa_enabled,
      isTwoFactorAuthenticated: true,
    };

    return {
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(
      user.email,
      'AUTH_APP_NAME',
      secret,
    );

    await this.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpAuthUrl,
    };
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    twoFactorSecret: string,
  ) {
    var code = JSON.stringify(twoFactorAuthenticationCode);

    const a = authenticator.verify({
      token: code,
      secret: twoFactorSecret,
    });

    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: twoFactorSecret,
    });
  }

  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'user'],
    };
  }
  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'user'],
    };
  }
  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    return {
      message: 'success',
      success: true,
    };
  }
  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
      is_contact_exist: true,
    };
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    await this.knex('users')
      .where({ id: userId })
      .update({ twofa_secret: secret });
  }

  async turnOnTwoFactorAuthentication(turnOn: any, userId: number) {
    await this.knex('users')
      .where({ id: userId })
      .update({ twofa_enabled: turnOn });
  }

  async me(userId: number) {
    return await this.knex('users').where({ id: userId });
  }
}
