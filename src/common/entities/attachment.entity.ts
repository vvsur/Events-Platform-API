import { CoreEntity } from '../../common/entities/core.entity';

export class Attachment extends CoreEntity {
  url?: string;
  metadata: string;
  thumbnail?: string;
  original?: string;
}
