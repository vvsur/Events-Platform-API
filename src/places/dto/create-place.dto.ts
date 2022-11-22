import { OmitType } from '@nestjs/swagger';
import { Place } from '../entities/place.entity';
import { Tag } from '../../common/entities/core.entity';

export class CreatePlaceDto extends OmitType(Place, [
  'id',
  'created_at',
  'updated_at',
]) {
  tags: Tag[];
}
