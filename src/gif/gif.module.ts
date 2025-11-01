import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GifService } from './gif.service';
import { GifController } from './gif.controller';
import { Gif } from './entities/gif.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gif])],
  controllers: [GifController],
  providers: [GifService],
  exports: [GifService],
})
export class GifModule {}
