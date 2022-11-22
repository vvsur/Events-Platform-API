import { Attachment } from '../../common/entities/attachment.entity';
import { CoreEntity, MomentItem } from '../../common/entities/core.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Organizer } from '../../organizers/entities/organizer.entity';
import { Place } from '../../places/entities/place.entity';
import { Review } from '../../reviews/entities/review.entity';

export class Event extends CoreEntity {
  title: string;
  title_short: string;
  sysname: string;
  place_id: number;
  place?: Place;
  description: string;
  body: string;
  city_sysname: string;
  age_restriction?: string;
  price?: number;
  is_free?: boolean;
  tags?: string[];
  categories?: string[];
  related_events?: Event[];
  images?: Attachment[];
  moments?: MomentItem[];
  organizer_id?: number;
  organizer?: Organizer;
  language?: string;
  transactions?: Transaction[];
  reviews?: Review[];
  ratings?: number;
  in_wishlist?: boolean;
}
