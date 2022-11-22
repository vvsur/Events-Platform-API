import { PaginationArgs } from '../../common/dto/pagination-args.dto';
import { Paginator } from '../../common/dto/paginator.dto';

import { Place } from '../entities/place.entity';

export class PlacePaginator extends Paginator<Place> {
  data: Place[];
}

export class GetPlacesDto extends PaginationArgs {
  transactionBy?: string;
  sortedBy?: string;
  searchJoin?: string;
  search?: string;
  date_range?: string;
  language?: string;
}
