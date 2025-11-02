import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GifService } from './gif.service';
import { CreateGifDto } from './dto/create-gif.dto';
import { UpdateGifDto } from './dto/update-gif.dto';

@Controller('gif')
export class GifController {
  constructor(private readonly gifService: GifService) {}

  @Post()
  create(@Body() createGifDto: CreateGifDto) {
    return this.gifService.create(createGifDto);
  }

  @Get()
  findAll(@Query('category') category?: string, @Query('userId') userId?: string) {
    if (userId) {
      return this.gifService.findByUser(userId);
    }
    if (category) {
      return this.gifService.findByCategory(category);
    }
    return this.gifService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gifService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGifDto: UpdateGifDto) {
    return this.gifService.update(id, updateGifDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gifService.remove(id);
  }
}
