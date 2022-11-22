import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateProfileDto } from './create-profile.dto';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  EVENT_OWNER = 'Event owner',
  USER = 'User',
}
export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {
  profile: CreateProfileDto;
  permission: Permission = Permission.USER;
}
