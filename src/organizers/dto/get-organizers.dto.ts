import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

import { Paginator } from 'src/common/dto/paginator.dto';
import { Organizer } from '../entities/organizer.entity';

export class OrganizerPaginator extends Paginator<Organizer> {
  data: Organizer[];
}

export class GetOrganizersDto extends PaginationArgs {
  transactionBy?: string;
  search?: string;
  sortedBy?: string;
  is_active?: boolean;
}
