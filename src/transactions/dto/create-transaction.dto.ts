export class CreateTransactionDto {
  organizer_id?: number;
  coupon_id?: number;
  status: string;
  user_contact: string;
  events: ConnectEventTransactionPivot[];
  amount: number;
  tax: number;
  total?: number;
  paid_total?: number;
  payment_id?: string;
  discount?: number;
  fee?: number;
  card?: CardInput;
  language?: string;
}

export class ConnectEventTransactionPivot {
  event_id: number;
  unit_price: number;
  subtotal: number;
}

export class CardInput {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email?: string;
}
