import { PickType } from '@nestjs/swagger';
import { Organizer } from '../entities/organizer.entity';

export class CreateOrganizerDto extends PickType(Organizer, [
  'name',
  'description',
  'logo',
  'contact_details',
]) {
  categories: number[];
}

export class ApproveOrganizerDto {
  id: number;
  admin_commission_rate: number;
}
