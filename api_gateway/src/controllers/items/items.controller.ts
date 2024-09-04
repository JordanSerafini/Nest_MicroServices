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
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateItemDto } from '../../dto/create-item.dto';
import { UpdateItemDto } from '../../dto/update-item.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  private readonly logger = new CustomLogger('ItemsController');

  constructor(
    @Inject('ITEM_SERVICE') private readonly itemServiceClient: ClientProxy,
  ) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Creating item for user: ${email}`);
    return this.itemServiceClient.send(
      { cmd: 'create_item' },
      { createItemDto, email },
    );
  }

  @Get()
  findAllItems(@Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all items for user: ${email}`);
    return this.itemServiceClient.send({ cmd: 'find_all_items' }, { email });
  }

  @Get(':id')
  findOneItem(@Param('id') id: number | string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching item with ID ${id} for user: ${email}`);
    return this.itemServiceClient.send({ cmd: 'find_one_item' }, { id, email });
  }

  @Patch(':id')
  updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Request() req,
  ) {
    const email = req.user.email;
    this.logger.log(`Updating item with ID ${id} for user: ${email}`);
    return this.itemServiceClient.send(
      { cmd: 'update_item' },
      { id, updateItemDto, email },
    );
  }

  @Delete(':id')
  removeItem(@Param('id') id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Removing item with ID ${id} for user: ${email}`);
    return this.itemServiceClient.send({ cmd: 'remove_item' }, { id, email });
  }
}
