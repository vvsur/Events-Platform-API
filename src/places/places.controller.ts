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
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { GetPlacesDto, PlacePaginator } from './dto/get-places.dto';
import { Place } from './entities/place.entity';
import { GetPopularPlacesDto } from './dto/get-popular-places.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  createPlace(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  async getPlaces(@Query() query: GetPlacesDto): Promise<PlacePaginator> {
    return this.placesService.getPlaces(query);
  }

  @Get(':sysname')
  async getPlaceBySysname(@Param('sysname') sysname: string): Promise<Place> {
    return this.placesService.getPlaceBySysname(sysname);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}

@ApiTags('Places')
@Controller('popular-places')
export class PopularPlacesController {
  constructor(private readonly placesService: PlacesService) {}
  @Get()
  async getPlaces(@Query() query: GetPopularPlacesDto): Promise<Place[]> {
    return this.placesService.getPopularPlaces(query);
  }
}
