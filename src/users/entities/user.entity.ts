import { CoreEntity } from '../../common/entities/core.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Organizer } from '../../organizers/entities/organizer.entity';
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
