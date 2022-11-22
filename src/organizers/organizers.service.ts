import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { Organizer } from './entities/organizer.entity';
import organizersJson from './organizers.json';
import Fuse from 'fuse.js';
import { GetOrganizersDto } from './dto/get-organizers.dto';
import { paginate } from 'src/common/pagination/paginate';

const organizers = plainToClass(Organizer, organizersJson);
const options = {
  keys: ['name', 'type.sysname', 'is_active'],
  threshold: 0.3,
};
const fuse = new Fuse(organizers, options);

@Injectable()
export class OrganizersService {
  private organizers: Organizer[] = organizers;

  create(createOrganizerDto: CreateOrganizerDto) {
    return this.organizers[0];
  }

  getOrganizers({ search, limit, page }: GetOrganizersDto) {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Organizer[] = this.organizers;
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');

        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/organizers?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrganizer(sysname: string): Organizer {
    return this.organizers.find((p) => p.sysname === sysname);
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return this.organizers[0];
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
