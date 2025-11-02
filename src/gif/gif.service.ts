import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gif } from './entities/gif.entity';
import { CreateGifDto } from './dto/create-gif.dto';
import { UpdateGifDto } from './dto/update-gif.dto';

@Injectable()
export class GifService {
  constructor(
    @InjectRepository(Gif)
    private readonly gifRepository: Repository<Gif>,
  ) {}

  async create(createGifDto: CreateGifDto): Promise<Gif> {
    const gif = this.gifRepository.create(createGifDto);
    return await this.gifRepository.save(gif);
  }

  async findAll(): Promise<Gif[]> {
    return await this.gifRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Gif> {
    const gif = await this.gifRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!gif) {
      throw new NotFoundException(`Gif with ID ${id} not found`);
    }
    return gif;
  }

  async findByCategory(category: string): Promise<Gif[]> {
    return await this.gifRepository.find({ 
      where: { category },
      relations: ['user']
    });
  }

  async findByUser(userId: string): Promise<Gif[]> {
    return await this.gifRepository
      .createQueryBuilder('gif')
      .leftJoinAndSelect('gif.user', 'user')
      .select([
        'gif.id',
        'gif.url',
        'gif.title',
        'gif.description',
        'gif.category',
        'gif.createdAt',
        'gif.updatedAt',
        'gif.user_id',
        'user.id',
        'user.username'
      ])
      .where('gif.user_id = :userId', { userId })
      .getMany();
  }

  async update(id: string, updateGifDto: UpdateGifDto): Promise<Gif> {
    const gif = await this.findOne(id);
    Object.assign(gif, updateGifDto);
    return await this.gifRepository.save(gif);
  }

  async remove(id: string): Promise<void> {
    const gif = await this.findOne(id);
    await this.gifRepository.remove(gif);
  }
}
