import { CoreEntity } from 'src/common/entities/core.entity';

export class Attachment extends CoreEntity {
  url?: string;
  metadata: string;
  thumbnail?: string;
  original?: string;
}
