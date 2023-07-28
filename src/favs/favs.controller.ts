import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post(':id')
  create(@Param('id') id: string, @Body() createFavDto: CreateFavDto) {
    return this.favsService.create(createFavDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favsService.remove(+id);
  }
}
