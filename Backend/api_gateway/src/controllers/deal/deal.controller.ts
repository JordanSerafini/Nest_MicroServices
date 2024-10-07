import {
  Controller,
  Get,
  Inject,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomLogger } from '../../logging/custom-logger.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('deal')
@UseGuards(JwtAuthGuard)
export class DealController {
  private readonly logger = new CustomLogger('DealController');

  constructor(
    @Inject('DEAL_SERVICE')
    private readonly dealServiceClient: ClientProxy,
  ) {}

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

    return this.dealServiceClient.send({ cmd: 'paginate' }, paginationParams);
  }
}
