//import { Type } from 'class-transformer';

export class CoreEntity {
  id: number;
  // @Type(() => Date)
  created_at: Date;
  // @Type(() => Date)
  updated_at: Date;
}

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

export class Tag extends CoreEntity {
  name: string;
  sysname: string;
}

export class City extends CoreEntity {
  name: string;
  name2: string;
  sysname: string;
}

export class MomentItem extends CoreEntity {
  from: number;
  to: number;
}

export class ContentSiteMapItem extends CoreEntity {
  lang: string;
  sysname: string;
}

export class ContentPageBlock extends CoreEntity {
  body: string;
  sysname: string;
}

export class ContentPage extends CoreEntity {
  description: string;
  title: string;
  body: string;
  keywords: string;
  sysname: string;
}

export class PaymentGateway extends CoreEntity {
  name: string;
  sysname: string;
}
