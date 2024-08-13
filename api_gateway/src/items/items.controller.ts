import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(
    @Inject('ITEM_SERVICE') private readonly itemServiceClient: ClientProxy,
  ) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemServiceClient.send({ cmd: 'create_item' }, createItemDto);
  }

  @Get()
  findAllItems() {
    return this.itemServiceClient.send({ cmd: 'find_all_items' }, {});
  }

  @Get(':id')
  findOneItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'find_one_item' }, id);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemServiceClient.send(
      { cmd: 'update_item' },
      { id, ...updateItemDto },
    );
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'remove_item' }, id);
  }
}
