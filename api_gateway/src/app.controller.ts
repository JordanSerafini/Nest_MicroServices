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

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('')
export class AppController {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
    @Inject('ITEM_SERVICE') private readonly itemServiceClient: ClientProxy,
  ) {}

  // Customer routes
  @UseGuards(JwtAuthGuard) // Applique le guard à toutes les routes clientes
  @Post('customers')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerServiceClient.send(
      { cmd: 'create_customer' },
      createCustomerDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('customers')
  findAllCustomers() {
    return this.customerServiceClient.send({ cmd: 'find_all_customers' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('customers/:id')
  findOneCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'find_one_customer' }, id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete('customers/:id')
  removeCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'remove_customer' }, id);
  }

  // Item routes
  @UseGuards(JwtAuthGuard)
  @Post('items')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemServiceClient.send({ cmd: 'create_item' }, createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('items')
  findAllItems() {
    return this.itemServiceClient.send({ cmd: 'find_all_items' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'find_one_item' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemServiceClient.send(
      { cmd: 'update_item' },
      { id, ...updateItemDto },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.itemServiceClient.send({ cmd: 'remove_item' }, id);
  }
}
