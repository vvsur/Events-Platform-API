import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  OtpDto,
  OtpLoginDto,
  RegisterDto,
  ResetPasswordDto,
  SocialLoginDto,
  VerifyForgetPasswordDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@ApiTags('Autentification')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createAccount(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard)
  async generateTwoFactor(@Response() response, @Request() request) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthenticationSecret(
        request.user,
      );

    return response.json(
      await this.authService.generateQrCodeDataURL(otpAuthUrl),
    );
  }

  @Post('2fa/turn')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Request() request, @Body() body) {
    if (request.user && body.on) {
      await this.authService.turnOnTwoFactorAuthentication(
        body.on,
        request.user.id,
      );
      return {
        statusCode: 200,
        message: '2 factor authentication is ' + body.on,
      };
    }

    throw new UnauthorizedException('Wrong authentication code');
  }

  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Request() request, @Body() body) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      body.code,
      request.user.twofa_secret,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return this.authService.loginWithTwoFA(request.user);
  }

  @Post('social-login-token')
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }
  @Post('otp-login')
  otpLogin(@Body() otpLoginDto: OtpLoginDto) {
    return this.authService.otpLogin(otpLoginDto);
  }
  @Post('otp-code-send')
  sendOtpCode(@Body() otpDto: OtpDto) {
    return this.authService.sendOtpCode(otpDto);
  }
  @Post('otp-code-verify')
  verifyOtpCode(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtpCode(verifyOtpDto);
  }
  @Post('password-forget')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Post('password-forget-verify-token')
  verifyForgetPassword(
    @Body() verifyForgetPasswordDto: VerifyForgetPasswordDto,
  ) {
    return this.authService.verifyForgetPasswordToken(verifyForgetPasswordDto);
  }

  @Post('password-reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @Post('password-change')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Post('logout')
  async logout(): Promise<boolean> {
    return true;
  }

  @Get('me')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Jwt2faAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async me(@Request() request) {
    return this.authService.me(request.user.id);
  }
}
