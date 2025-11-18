import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { GetItemsQueryDto } from './dto/get-items-query.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems(
    @Query(new ValidationPipe({ transform: true })) query: GetItemsQueryDto,
  ): Promise<Item[]> {
    return this.itemsService.findAll(query.limit, query.offset);
  }
}
'@