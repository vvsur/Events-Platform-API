import { Attachment } from 'src/common/entities/attachment.entity';
import {
  CoreEntity,
  ContactDetails,
  Tag,
} from 'src/common/entities/core.entity';
import { Review } from '../../reviews/entities/review.entity';

export class Place extends CoreEntity {
  title: string;
  title_short: string;
  sysname: string;
  city_sysname: string;
  body?: string;
  description?: string;
  images?: Attachment[];
  tags?: Tag[];
  contact_details?: ContactDetails;
  age_restriction?: string;
  is_parking?: boolean;
  reviews?: Review[];
  ratings: number;
  events: Event[];
}
