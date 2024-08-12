import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ItemService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern({ cmd: 'create_item' })
  create(createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @MessagePattern({ cmd: 'find_all_items' })
  findAll() {
    return this.itemService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_item' })
  findOne(id: string) {
    return this.itemService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_item' })
  update({ id, updateItemDto }: { id: string; updateItemDto: UpdateItemDto }) {
    return this.itemService.update(+id, updateItemDto);
  }

  @MessagePattern({ cmd: 'remove_item' })
  remove(id: string) {
    return this.itemService.remove(+id);
  }
}
