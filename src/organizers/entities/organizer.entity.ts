import { Attachment } from '../../common/entities/attachment.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';

export class ContactDetails {
  socials: Socials[];
  contact: string;
  location: Location;
  website: string;
}

export class Location {
  lat: number;
  lng: number;
  city?: string;
  state: string;
  country: string;
  subway?: string;
  zip?: string;
  formattedWallet: string;
}

export class Socials {
  icon: string;
  url: string;
}

export class Organizer extends CoreEntity {
  id: number;
  owner_id: number;
  owner: User;
  is_active: boolean;
  events: Event[];
  name: string;
  description?: string;
  logo?: Attachment;
  contact_details?: ContactDetails;
  sysname: string;
}
