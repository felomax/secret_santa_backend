import { PartialType } from '@nestjs/mapped-types';
import { CreateGifDto } from './create-gif.dto';

export class UpdateGifDto extends PartialType(CreateGifDto) {}
