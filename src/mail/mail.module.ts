import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Module({
  providers: [MailService],
})
export class MailModule { }
