import { Attachment } from '../../common/entities/attachment.entity';

export class CreateReviewDto {
  rating: number;
  name: string;
  decription: string;
  body: string;
  photos?: Attachment[];
  event_id?: number;
  place_id?: number;
}
