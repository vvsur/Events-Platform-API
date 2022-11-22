import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto, EventPaginator } from './dto/get-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ContentSiteMapItem, City } from '../common/entities/core.entity';
import eventsJson from '@db/events.json';
import Fuse from 'fuse.js';
import { GetPopularEventsDto } from './dto/get-popular-events.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

import moment from 'moment';

const events = plainToClass(Event, eventsJson);

const options = {
  keys: ['name', 'status', 'organizer_id', 'tags'],
  threshold: 0.3,
};
// const fuse = new Fuse(events, options);

@Injectable()
export class EventsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  private events: any = events;

  create(createEventDto: CreateEventDto) {
    return this.events[0];
  }

  async getCategories(): Promise<any> {
    const result: any | undefined = await this.knex('eventsCategories').select([
      'id',
      'sysname',
      'name',
    ]);

    return result ? result : [];
  }

  async getSiteMap(query: any): Promise<ContentSiteMapItem[]> {
    const result: ContentSiteMapItem[] | undefined = await this.knex('events')
      .select(['lang', 'sysname', 'id', 'created_at', 'updated_at'])
      .where('isActive', true);

    return result ? result : [];
  }

  async getPage(sysname: string): Promise<any> {
    const result: any | undefined = await this.knex('pages')
      .select(['title', 'description', 'body', 'keywords'])
      .where('sysname', sysname)
      .first();

    return result ? result : {};
  }

  async getPageBlock(sysname: string): Promise<any> {
    const result: any | undefined = await this.knex('pageBlocks')
      .select(['content'])
      .where('sysname', sysname)
      .first();

    return result ? result : {};
  }

  async getCities(): Promise<any> {
    return [
      { name: 'Любое место', name2: 'любом месте', sysname: 'all-cities' },
      { name: 'ONLINE', name2: 'ONLINE', sysname: 'online' },
      { name: 'Москва', name2: 'Москве', sysname: 'msk' },
      { name: 'Санкт-Петербург', name2: 'Санкт-Петербурге', sysname: 'spb' },
      { name: 'Сочи', name2: 'Сочи', sysname: 'sch' },
      { name: 'Краснодар', name2: 'Краснодаре', sysname: 'krd' },
      { name: 'Казань', name2: 'Казани', sysname: 'kzn' },
      { name: 'Екатеринбург', name2: 'Екатеринбурге', sysname: 'ekb' },
      { name: 'Нижний Новгород', name2: 'Нижнем Новгороде', sysname: 'nnv' },
      { name: 'Новосибирск', name2: 'Новосибирске', sysname: 'nsk' },
      { name: 'Красноярск', name2: 'Красноярске', sysname: 'kry' },
    ];
  }

  async getImages(): Promise<any> {
    return [];
  }

  async getEvents({
    limit,
    page,
    page_size,
    city,
    moment_type,
    group,
    search,
  }: any): Promise<any> {
    if (!page) page = 0;
    if (!page_size) page_size = 10;
    if (!city) city = 'all-cities';
    if (!moment_type) moment_type = 'all-times';
    if (!group) group = null;

    page = page - 1;
    if (page < 0) page = 0;

    let from = null;
    let to = null;

    switch (moment_type) {
      case 'today':
        from = moment().startOf('day');
        to = moment().endOf('day');
        break;
      case 'tomorrow':
        from = moment().add(1, 'day').startOf('day');
        to = moment().add(1, 'day').endOf('day');
        break;
      case 'this-weekend':
        from = moment().endOf('week').startOf('day');
        to = moment().endOf('week').add(1, 'day');
        break;
      case 'this-week':
        from = moment().startOf('week').add(1, 'day');
        to = moment().endOf('week').add(1, 'day');
        break;
      case 'next-week':
        from = moment().add(1, 'week').startOf('week').add(1, 'day');
        to = moment().add(1, 'week').endOf('week').add(1, 'day');
        break;
      case 'this-month':
        from = moment().startOf('month');
        to = moment().endOf('month');
        break;
      case 'next-month':
        from = moment().add(1, 'month').startOf('month');
        to = moment().add(1, 'month').endOf('month');
        break;

      case 'past':
        from = null;
        to = null;
        break;

      default:
        from = null;
        to = null;
        break;
    }

    const momentFormat = 'YYYY-MM-DD HH:mm:ss';

    let result = {};
    let dbValue: any = [];

    if (moment_type === 'past') {
      dbValue = await this.knex.raw(
        'SELECT * FROM get_events_past(?, ?, ?, ?)',
        [
          city === 'all-cities' ? null : city,
          group,
          page * page_size,
          page_size,
        ],
      );
    } else if (!from && !to) {
      /*all-times*/ dbValue = await this.knex.raw(
        'SELECT * FROM get_events_current_all(?, ?, ?, ?)',
        [
          city === 'all-cities' ? null : city,
          group,
          page * page_size,
          page_size,
        ],
      );
    } else {
      dbValue = await this.knex.raw(
        'SELECT * FROM get_events_current(?, ?, ?, ?, ?, ?)',
        [
          city === 'all-cities' ? null : city,
          group,
          page * page_size,
          page_size,
          from.unix(),
          to.unix(),
        ],
      );
    }

    if (dbValue && dbValue.rows && dbValue.rows.length > 0) {
      result = dbValue.rows[0];
    }

    return result ? result : [];
  }

  getEventBySysname(sysname: string): Event {
    const event = this.events.find((p) => p.sysname === sysname);
    const related_events = this.events
      .filter((p) => p.type.sysname === event.type.sysname)
      .slice(0, 20);
    return {
      ...event,
      related_events,
    };
  }

  async getEventById(id: number): Promise<any> {
    const event: Event | undefined = await this.knex('events')
      .select([
        'id',
        'title',
        'titleShort as title_short',
        'sysname',
        'placeId as place_id',
        'description',
        'body',
        'sourceCity as city_sysname',
        'ageRestriction as age_restriction',
        'price',
        'isFree as is_free',
        'categories',
        'tags',
        'moments',
        'lang as language',
      ])
      .where('id', id)
      .first();

    ///////

    const dbRelative = await this.knex.raw(
      'SELECT * FROM get_relative_events(?, ?, ?)',
      [event.city_sysname, 6, event.id],
    );

    if (dbRelative && dbRelative.rows.length > 0)
      event.related_events = dbRelative.rows[0].items;

    let images = await this.knex('upload_file_morph')
      .join(
        'upload_file',
        'upload_file.id',
        '=',
        'upload_file_morph.upload_file_id',
      )
      .select('upload_file.url', 'upload_file.provider_metadata as metadata')
      .where('related_id', id)
      .where('related_type', 'events');

    event.images = images;

    return event ? event : {};
  }

  // getPopularEvents({ limit, type_sysname }: GetPopularEventsDto): Event[] {
  //   let data: any = this.events;
  //   if (type_sysname) {
  //     data = fuse.search(type_sysname)?.map(({ item }) => item);
  //   }
  //   return data?.slice(0, limit);
  // }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.events[0];
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
