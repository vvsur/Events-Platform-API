import { CoreEntity } from 'src/common/entities/core.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Organizer } from 'src/organizers/entities/organizer.entity';
import { Profile } from './profile.entity';

export class User extends CoreEntity {
  name: string;
  email: string;
  password?: string;
  profile?: Profile;
  organizers?: Organizer[];
  is_active?: boolean = true;
  twofa_enabled?: boolean = false;
  transactions?: Transaction[];
}
