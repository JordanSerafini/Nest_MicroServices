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
  BadRequestException,
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

  @Get('geocode')
  geocodeCustomers(@Request() req) {
    const email = req.user.email;
    this.logger.log(`Geocoding all customers for user: ${email}`);
    return this.customerServiceClient.send(
      { cmd: 'geocode_customer' },
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

  @Get('map')
  async getCustomersWithinRadius(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('rayon') rayon: string,
    @Request() req,
  ) {
    const email = req.user.email;

    // Validation des paramètres
    const latCentral = parseFloat(lat);
    const lonCentral = parseFloat(lon);
    const rayonM = parseFloat(rayon);

    if (isNaN(latCentral) || isNaN(lonCentral) || isNaN(rayonM)) {
      throw new BadRequestException('Invalid parameters');
    }

    // Préparer le payload pour le service client
    const payload = {
      email,
      lat: latCentral,
      lon: lonCentral,
      rayon: rayonM,
    };

    try {
      // Envoyer un message au service client via le client proxy
      const customers = await this.customerServiceClient
        .send({ cmd: 'map' }, payload)
        .toPromise();

      return customers;
    } catch (error) {
      this.logger.error(
        `Error fetching customers within radius for user: ${email}`,
        error.stack || '',
      );
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findOneCustomer(@Param('id') id: number, @Request() req) {
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
