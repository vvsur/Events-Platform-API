import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  GetTransactionsDto,
  TransactionPaginator,
} from './dto/get-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import transactionsJson from '@db/transactions.json';
import { plainToClass } from 'class-transformer';
import { Transaction } from './entities/transaction.entity';
import { paginate } from 'src/common/pagination/paginate';

const transactions = plainToClass(Transaction, transactionsJson);

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = transactions;

  create(createTransactionInput: CreateTransactionDto) {
    return this.transactions[0];
  }

  getTransactions({
    limit,
    page,
    user_id,
    search,
  }: GetTransactionsDto): TransactionPaginator {
    if (!page) page = 1;
    if (!limit) limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data: Transaction[] = this.transactions;

    if (user_id) {
      data = this.transactions?.filter((p) => p?.user?.id === Number(user_id));
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/transactions?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getTransactionById(id: string): Transaction {
    return this.transactions.find((p) => p.id === Number(id));
  }

  update(id: number, updateTransactionInput: UpdateTransactionDto) {
    return this.transactions[0];
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
