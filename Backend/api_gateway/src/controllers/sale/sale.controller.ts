import {
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
  Request,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('sale')
@UseGuards(JwtAuthGuard)
export class SaleController {
  private readonly logger = new CustomLogger('SaleController');

  constructor(
    @Inject('SALE_SERVICE')
    private readonly saleServiceClient: ClientProxy,
  ) {}

  //* ------------------- Classic Routes ------------------- *//
  @Get('paginate')
  paginate(
    @Request() req,
    @Query('searchQuery') searchQuery: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated sale for user: ${email}`);

    const paginationParams = {
      email,
      searchQuery: searchQuery || '',
      limit: parseInt(limit, 10) || 25,
      page: Math.floor(parseInt(offset, 10) / parseInt(limit, 10)) || 0,
    };

    return this.saleServiceClient.send({ cmd: 'paginate' }, paginationParams);
  }

  @Get('paginate_date')
  paginateDate(
    @Request() req,
    @Query('searchQuery') searchQuery: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated sale for user: ${email}`);

    const paginationParams = {
      email,
      searchQuery: searchQuery || '',
      limit: parseInt(limit, 10) || 25,
      page: Math.floor(parseInt(offset, 10) / parseInt(limit, 10)) || 0,
    };

    return this.saleServiceClient.send(
      { cmd: 'paginate_date' },
      paginationParams,
    );
  }

  @Get('monthly_income')
  async getMonthlyIncome(
    @Request() req,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    const email = req.user.email;
    this.logger.log(
      `Fetching monthly income for user: ${email}, month: ${month}, year: ${year}`,
    );

    try {
      const result = await this.saleServiceClient
        .send({ cmd: 'monthly_income' }, { month, year })
        .toPromise();
      return result;
    } catch (error) {
      this.logger.error('Error fetching monthly income', error.message);
      throw new HttpException(
        'Failed to fetch monthly income',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //* ------------------- Dynamic Routes ------------------- *//
  @Get('paginate/:category([A-Z]{2})')
  paginateCategory(
    @Request() req,
    @Param('category') category: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const email = req.user.email;
    this.logger.log(
      `Fetching paginated sale for user: ${email}, category: ${category}`,
    );

    const parsedLimit = parseInt(limit, 10) || 10;
    const parsedOffset = parseInt(offset, 10) || 0;

    const paginationParams = {
      email,
      category,
      limit: parsedLimit,
      page: Math.floor(parsedOffset / parsedLimit) || 0,
    };

    return this.saleServiceClient.send(
      { cmd: 'paginate_category' },
      paginationParams,
    );
  }

  @Get(':Id')
  findOneItem(@Param('Id') Id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all items for user: ${email}`);
    return this.saleServiceClient.send(
      { cmd: 'find_one_SaleDocument' },
      { Id, email },
    );
  }

  @Get(':Id/lines')
  findLines(@Param('Id') Id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all lines for user: ${email}`);
    return this.saleServiceClient.send(
      { cmd: 'find_lines_SaleDocument' },
      { Id, email },
    );
  }
}
