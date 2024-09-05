import { Get, Inject, Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('synchronisation')
export class SynchroController {
  constructor(
    @Inject('SYNCHRO_SERVICE')
    private readonly synchroServiceClient: ClientProxy,
  ) {}

  @Get('customer-counts')
  getCustomerCounts() {
    return this.synchroServiceClient.send({ cmd: 'get_customer_counts' }, {});
  }
}
