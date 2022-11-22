import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import usersJson from '../users/users.json';

import { InjectKnex, Knex } from 'nestjs-knex';
import { MailerService } from '@nestjs-modules/mailer';

// import Knex from 'knex';

const users = plainToClass(User, usersJson);

@Injectable()
export class MailService {
  private code;

  constructor(
    @InjectKnex() private readonly knex: Knex,
    private mailerService: MailerService,
  ) {
    this.code = Math.floor(10000 + Math.random() * 90000);
  }

  async sendConfirmationEmail(name: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm Email',
      template: 'confirm',
      context: {
        name,
        code: this.code,
      },
    });
  }
}
