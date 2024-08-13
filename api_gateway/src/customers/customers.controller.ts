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
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerServiceClient.send(
      { cmd: 'create_customer' },
      createCustomerDto,
    );
  }

  @Get()
  findAllCustomers() {
    return this.customerServiceClient.send({ cmd: 'find_all_customers' }, {});
  }

  @Get(':id')
  findOneCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'find_one_customer' }, id);
  }

  @Patch(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerServiceClient.send(
      { cmd: 'update_customer' },
      { id, ...updateCustomerDto },
    );
  }

  @Delete(':id')
  removeCustomer(@Param('id') id: string) {
    return this.customerServiceClient.send({ cmd: 'remove_customer' }, id);
  }
}
