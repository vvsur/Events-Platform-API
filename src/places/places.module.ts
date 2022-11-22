import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController, PopularPlacesController } from './places.controller';

@Module({
  controllers: [PlacesController, PopularPlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
