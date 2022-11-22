import { SortTransaction } from '../../common/dto/generic-conditions.dto';
import { PaginationArgs } from '../../common/dto/pagination-args.dto';
import { Paginator } from '../../common/dto/paginator.dto';
import { Review } from '../entities/review.entity';

export class ReviewPaginator extends Paginator<Review> {
  data: Review[];
}

export class GetReviewsDto extends PaginationArgs {
  sortedBy?: SortTransaction;
  search?: string;
  event_id?: string;
  place_id?: string;
}
