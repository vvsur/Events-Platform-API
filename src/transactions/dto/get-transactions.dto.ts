import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Transaction } from '../entities/transaction.entity';

export class TransactionPaginator extends Paginator<Transaction> {
  data: Transaction[];
}

export class GetTransactionsDto extends PaginationArgs {
  transactionBy?: string;
  sortedBy?: string;
  user_id?: number;
  organizer_id?: string;
  search?: string;
}
