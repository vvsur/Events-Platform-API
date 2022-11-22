import { PickType } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'avatar',
  'bio',
  'socials',
  'contact',
]) {
  user: ConnectBelongsTo;
}

export class ConnectBelongsTo {
  connect: number;
}
