import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import { Place } from '../../places/entities/place.entity';
import { Attachment } from '../../common/entities/attachment.entity';

export class Review extends CoreEntity {
  rating: number;
  name: string;
  decription: string;
  body: string;
  user: User;
  photos: Attachment[];
  event?: Event;
  place?: Place;
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  user_id: number;
  event_id?: number;
  place_id?: number;
  parent_rewiew?: Review;
  children: Review[];
}
