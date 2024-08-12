import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('')
export class AppController {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
    @Inject('ITEM_SERVICE') private readonly itemServiceClient: ClientProxy,
  ) {}

  // Customer routes
  @Post('customers')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerServiceClient.send(
      { cmd: 'create_customer' },
      createCustomerDto,
    );
  }

  @Get('customers')
  findAllCustomers() {
    return this.customerServiceClient.send({ cmd: 'find_all_customers' }, {});
  }

  @Get('customers/:id')
  findOneCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'find_one_customer' }, id);
  }

  @Patch('customers/:id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerServiceClient.send(
      { cmd: 'update_customer' },
      { id, ...updateCustomerDto },
    );
  }

  @Delete('customers/:id')
  removeCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'remove_customer' }, id);
  }

  // Item routes
  @Post('items')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemServiceClient.send({ cmd: 'create_item' }, createItemDto);
  }

  @Get('items')
  findAllItems() {
    return this.itemServiceClient.send({ cmd: 'find_all_items' }, {});
  }

  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'find_one_item' }, id);
  }

  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemServiceClient.send(
      { cmd: 'update_item' },
      { id, ...updateItemDto },
    );
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'remove_item' }, id);
  }
}
