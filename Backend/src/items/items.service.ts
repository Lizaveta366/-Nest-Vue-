import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(limit: number = 100, offset: number = 0): Promise<Item[]> {
    return this.itemsRepository.find({
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });
  }

  async count(): Promise<number> {
    return this.itemsRepository.count();
  }
}
'@