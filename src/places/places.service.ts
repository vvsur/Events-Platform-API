import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlacesDto, PlacePaginator } from './dto/get-places.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { paginate } from 'src/common/pagination/paginate';
import placesJson from '@db/places.json';
import Fuse from 'fuse.js';
import { GetPopularPlacesDto } from './dto/get-popular-places.dto';

const places = plainToClass(Place, placesJson);

const options = {
  keys: ['name', 'status', 'tags'],
  threshold: 0.3,
};
const fuse = new Fuse(places, options);

@Injectable()
export class PlacesService {
  private places: any = places;

  create(createPlaceDto: CreatePlaceDto) {
    return this.places[0];
  }

  getPlaces({ limit, page, search }: GetPlacesDto): PlacePaginator {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Place[] = this.places;
    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'sysname') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/places?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getPlaceBySysname(sysname: string): Place {
    const place = this.places.find((p) => p.sysname === sysname);
    const related_places = this.places
      .filter((p) => p.type.sysname === place.type.sysname)
      .slice(0, 20);
    return {
      ...place,
      related_places,
    };
  }

  getPopularPlaces({ limit, type_sysname }: GetPopularPlacesDto): Place[] {
    let data: any = this.places;
    if (type_sysname) {
      data = fuse.search(type_sysname)?.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return this.places[0];
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
