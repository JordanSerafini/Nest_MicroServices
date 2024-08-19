import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ItemService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern({ cmd: 'create_item' })
  create(
    @Payload()
    { createItemDto, email }: { createItemDto: CreateItemDto; email: string },
  ) {
    return this.itemService.create(createItemDto, email);
  }

  @MessagePattern({ cmd: 'find_all_items' })
  findAll(@Payload() email: string) {
    return this.itemService.findAll(email);
  }

  @MessagePattern({ cmd: 'find_one_item' })
  findOne(@Payload() { id, email }: { id: string | number; email: string }) {
    if (!id) {
      console.error(`ID is missing or invalid: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      console.error(`Unable to parse ID: ${id}`);
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    console.log(`Received ID: ${parsedId}, Email: ${email}`);
    return this.itemService.findOne(parsedId, email);
  }

  @MessagePattern({ cmd: 'update_item' })
  update(
    @Payload()
    {
      id,
      updateItemDto,
      email,
    }: {
      id: string;
      updateItemDto: UpdateItemDto;
      email: string;
    },
  ) {
    return this.itemService.update(+id, updateItemDto, email);
  }

  @MessagePattern({ cmd: 'remove_item' })
  remove(@Payload() { id, email }: { id: string; email: string }) {
    return this.itemService.remove(+id, email);
  }
}