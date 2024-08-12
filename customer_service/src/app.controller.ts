import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './app.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'create_customer' })
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll() {
    return this.customerService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_customer' })
  findOne(id: string) {
    return this.customerService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_customer' })
  update(
    p0: string,
    p1: UpdateCustomerDto,
    {
      id,
      updateCustomerDto,
    }: {
      id: string;
      updateCustomerDto: UpdateCustomerDto;
    },
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @MessagePattern({ cmd: 'remove_customer' })
  remove(id: string) {
    return this.customerService.remove(+id);
  }
}
