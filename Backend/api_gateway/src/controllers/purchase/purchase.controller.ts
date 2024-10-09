import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('purchase')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  private readonly logger = new CustomLogger('PurchaseController');

  constructor(
    @Inject('PURCHASE_SERVICE')
    private readonly purchaseServiceClient: ClientProxy,
  ) {}

  @Get('paginate')
  paginate(
    @Request() req,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated purchases for user: ${email}`);

    const paginationParams = {
      email,
      limit: parseInt(limit, 10) || 25,
      offset: parseInt(offset, 10) || 0,
      searchQuery: searchQuery || '',
    };

    return this.purchaseServiceClient.send(
      { cmd: 'paginate' },
      paginationParams,
    );
  }

  @Get(':Id')
  getMaintenanceContractFULL(@Request() req, @Param('Id') Id: string) {
    const email = req.user.email;
    this.logger.log(`Fetching maintenance ${Id} for user: ${email}`);

    return this.purchaseServiceClient.send({ cmd: 'find_one' }, { Id, email });
  }
}
