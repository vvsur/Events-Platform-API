import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { EventsModule } from './events/events.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OrganizersModule } from './organizers/organizers.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        debug: true,
        connection: {
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        },
        pool: { min: 5, max: 30 },
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MailerModule.forRoot({
      transport: process.env.MAIL_TRANSPORT,
      defaults: {
        from: '"Gonna Visit" <info@gonnavisit.com>',
      },
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    EventsModule,
    TransactionsModule,
    OrganizersModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
