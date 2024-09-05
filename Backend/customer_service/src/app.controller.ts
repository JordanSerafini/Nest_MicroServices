import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from './app.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'create_customer' })
  create(
    @Payload()
    {
      createCustomerDto,
      email,
    }: {
      createCustomerDto: CreateCustomerDto;
      email: string;
    },
  ) {
    return this.customerService.create(createCustomerDto, email);
  }

  @MessagePattern({ cmd: 'find_all_customers' })
  findAll(@Payload() email: string) {
    return this.customerService.findAll(email);
  }

  @MessagePattern({ cmd: 'find_one_customer' })
  findOne(
    @Payload()
    { id, email }: { id: string; email: string },
  ) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.customerService.findOne(parsedId, email);
  }

  @MessagePattern({ cmd: 'update_customer' })
  update(
    @Payload()
    {
      id,
      updateCustomerDto,
      email,
    }: {
      id: string;
      updateCustomerDto: UpdateCustomerDto;
      email: string;
    },
  ) {
    return this.customerService.update(+id, updateCustomerDto, email);
  }

  @MessagePattern({ cmd: 'remove_customer' })
  remove(
    @Payload()
    { id, email }: { id: string; email: string },
  ) {
    return this.customerService.remove(+id, email);
  }

  @MessagePattern({ cmd: 'paginate_customers' })
  paginate(
    @Payload()
    {
      email,
      limit,
      offset,
      searchQuery,
    }: {
      email: string;
      limit: number;
      offset: number;
      searchQuery: string;
    },
  ) {
    return this.customerService.paginate(email, limit, offset, searchQuery);
  }
}
