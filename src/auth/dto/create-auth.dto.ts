import { PartialType, PickType } from '@nestjs/swagger';
import { CoreMutationOutput } from '../../common/dto/core-mutation-output.dto';
import { User } from '../../users/entities/user.entity';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  EVENT_OWNER = 'Event owner',
  USER = 'User',
}
export class RegisterDto extends PickType(User, ['name', 'email', 'password']) {
  permission: Permission = Permission.USER;
}

export class LoginDto extends PartialType(
  PickType(User, ['email', 'password']),
) {}

export class SocialLoginDto {
  provider: string;
  access_token: string;
}
export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
export class ForgetPasswordDto {
  email: string;
}
export class VerifyForgetPasswordDto {
  email: string;
  token: string;
}
export class ResetPasswordDto {
  email: string;
  token: string;
  password: string;
}

export class AuthResponse {
  token: string;
  permissions: string[];
}
export class CoreResponse extends CoreMutationOutput {}
export class VerifyOtpDto {
  otp_id: string;
  code: string;
  phone_number: string;
}
export class OtpResponse {
  id: string;
  message: string;
  success: boolean;
  phone_number: string;
  provider: string;
  is_contact_exist: boolean;
}
export class OtpDto {
  phone_number: string;
}
export class OtpLoginDto {
  otp_id: string;
  code: string;
  phone_number: string;
  name?: string;
  email?: string;
}
