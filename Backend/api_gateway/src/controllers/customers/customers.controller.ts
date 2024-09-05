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
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  private readonly logger = new CustomLogger('CustomersController');

  constructor(
    @Inject('CUSTOMER_SERVICE')
    private readonly customerServiceClient: ClientProxy,
  ) {}

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Creating customer for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'create_customer' },
      { createCustomerDto, email },
    );
  }

  @Get()
  findAllCustomers(@Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all customers for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'find_all_customers' },
      { email },
    );
  }

  @Get('paginate')
  paginate(
    @Request() req,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated customers for user: ${email}`);

    const paginationParams = {
      email,
      limit: parseInt(limit, 10) || 25,
      offset: parseInt(offset, 10) || 0,
      searchQuery: searchQuery || '',
    };

    return this.customerServiceClient.send(
      { cmd: 'paginate_customers' },
      paginationParams,
    );
  }

  @Get(':id')
  findOneCustomer(@Param('id') id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching customer with ID ${id} for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'find_one_customer' },
      { id, email },
    );
  }

  @Patch(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req,
  ) {
    const email = req.user.email;
    this.logger.log(`Updating customer with ID ${id} for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'update_customer' },
      { id, updateCustomerDto, email },
    );
  }

  @Delete(':id')
  removeCustomer(@Param('id') id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Removing customer with ID ${id} for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'remove_customer' },
      { id, email },
    );
  }
}
