import {
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
  Request,
  Query,
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
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated sale for user: ${email}`);

    const paginationParams = {
      email,
      searchQuery: searchQuery || '',
      limit: parseInt(limit, 10) || 25,
      offset: parseInt(offset, 10) || 0,
    };

    return this.saleServiceClient.send({ cmd: 'paginate' }, paginationParams);
  }

  //* ------------------- Dynamic Routes ------------------- *//
  @Get(':Id')
  findOneItem(@Param('Id') Id: string, @Request() req) {
    const email = req.user.email;
    this.logger.log(`Fetching all items for user: ${email}`);
    return this.saleServiceClient.send(
      { cmd: 'find_one_SaleDocument' },
      { Id, email },
    );
  }
}
