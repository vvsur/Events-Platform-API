import { CoreEntity, PaymentGateway } from 'src/common/entities/core.entity';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

export class Transaction extends CoreEntity {
  user_id: number;
  user: User;
  status: string;
  amount: number;
  fee: number;
  tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway: PaymentGateway;
  discount?: number;
  events: Event[];
}
