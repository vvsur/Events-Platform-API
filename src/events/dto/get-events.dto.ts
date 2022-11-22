import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Event } from '../entities/event.entity';

export class EventPaginator extends Paginator<Event> {
  data: Event[];
}

export class GetEventsDto extends PaginationArgs {
  transactionBy?: string;
  sortedBy?: string;
  searchJoin?: string;
  search?: string;
  date_range?: string;
  language?: string;
}

export enum QueryEventsTransactionByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
