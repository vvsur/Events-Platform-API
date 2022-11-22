import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async getEvents(@Query() query: any): Promise<any> {
    return this.eventsService.getEvents(query);
  }

  // @Get(':sysname')
  // async getEventBySysname(@Param('sysname') sysname: string): Promise<Event> {
  //   return this.eventsService.getEventBySysname(sysname);
  // }

  @Get(':id')
  async getEventBySysname(@Param('id') id: number): Promise<Event> {
    return this.eventsService.getEventById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}

@ApiTags('Events')
@Controller('popular-events')
export class PopularEventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async getEvents(): Promise<Event[]> {
    return null; //this.eventsService.getPopularEvents(query);
  }
}

@Controller('content')
export class ContentController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('sitemap')
  async getMap(@Query() query: {}): Promise<any> {
    return this.eventsService.getSiteMap(query);
  }

  @Get('page-blocks/:sysname')
  async getPageBlock(@Param('sysname') sysname: string): Promise<any> {
    return this.eventsService.getPageBlock(sysname);
  }

  @Get('pages/:sysname')
  async getPage(@Param('sysname') sysname: string): Promise<any> {
    return this.eventsService.getPage(sysname);
  }

  @Get('image')
  async getImage(@Param('sysname') sysname: string): Promise<any> {
    return this.eventsService.getImages();
  }

  @Get('categories')
  async getCategories(): Promise<any> {
    return this.eventsService.getCategories();
  }

}

@Controller('cities')
export class CitiesController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async getCities(): Promise<any> {
    return this.eventsService.getCities();
  }
}