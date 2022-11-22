import { SortTransaction } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
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
