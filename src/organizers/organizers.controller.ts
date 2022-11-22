import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { GetOrganizersDto, OrganizerPaginator } from './dto/get-organizers.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users & Organizers')
@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.create(createOrganizerDto);
  }

  @Get()
  async getOrganizers(
    @Query() query: GetOrganizersDto,
  ): Promise<OrganizerPaginator> {
    return this.organizersService.getOrganizers(query);
  }

  @Get(':sysname')
  async getOrganizer(@Param('sysname') sysname: string) {
    return this.organizersService.getOrganizer(sysname);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizersService.update(+id, updateOrganizerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizersService.remove(+id);
  }
}
