import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('maintenance')
@UseGuards(JwtAuthGuard)
export class MaintenanceController {
  private readonly logger = new CustomLogger('MaintenanceController');

  constructor(
    @Inject('MAINTENANCE_SERVICE')
    private readonly maintenanceServiceClient: ClientProxy,
  ) {}

  @Get('paginate')
  paginate(
    @Request() req,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    const email = req.user.email;
    this.logger.log(`Fetching paginated maintenance for user: ${email}`);

    const paginationParams = {
      email,
      limit: parseInt(limit, 10) || 25,
      offset: parseInt(offset, 10) || 0,
      searchQuery: searchQuery || '',
    };
    this.logger.log(`Fetching paginated maintenance`);
    return this.maintenanceServiceClient.send(
      { cmd: 'paginate' },
      paginationParams,
    );
  }
}
