import { OmitType } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';

export class CreateEventDto extends OmitType(Event, [
  'id',
  'created_at',
  'updated_at',
  'transactions',
  'organizer',
  'related_events',
]) {
  tags: string[];
  categories: string[];
}
