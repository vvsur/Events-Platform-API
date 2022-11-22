import { CoreEntity, PaymentGateway } from '../../common/entities/core.entity';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';

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
