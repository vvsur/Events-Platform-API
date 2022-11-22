import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  EventsController,
  PopularEventsController,
  ContentController,
  CitiesController,
} from './events.controller';

@Module({
  controllers: [
    EventsController,
    PopularEventsController,
    ContentController,
    CitiesController,
  ],
  providers: [EventsService],
})
export class EventsModule {}
