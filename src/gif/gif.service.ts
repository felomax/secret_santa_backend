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
    return await this.gifRepository.find({ relations: ['person'] });
  }

  async findOne(id: string): Promise<Gif> {
    const gif = await this.gifRepository.findOne({ 
      where: { id },
      relations: ['person']
    });
    if (!gif) {
      throw new NotFoundException(`Gif with ID ${id} not found`);
    }
    return gif;
  }

  async findByCategory(category: string): Promise<Gif[]> {
    return await this.gifRepository.find({ 
      where: { category },
      relations: ['person']
    });
  }

  async findByPerson(peopleId: string): Promise<Gif[]> {
    return await this.gifRepository
      .createQueryBuilder('gif')
      .leftJoinAndSelect('gif.person', 'person')
      .select([
        'gif.id',
        'gif.url',
        'gif.title',
        'gif.description',
        'gif.category',
        'gif.createdAt',
        'gif.updatedAt',
        'gif.people_id',
        // 'person.id',
        // 'person.name'
      ])
      .where('gif.people_id = :peopleId', { peopleId })
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
