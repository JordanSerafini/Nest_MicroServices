import { Controller } from '@nestjs/common';
import { MaintenanceService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MainteananceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @MessagePattern({ cmd: 'paginate' })
  async paginate(
    @Payload()
    {
      email,
      searchQuery,
      limit,
      offset,
    }: {
      email: string;
      limit: number;
      offset: number;
      searchQuery: string;
    },
  ) {
    return await this.maintenanceService.paginate(
      email,
      searchQuery,
      limit,
      offset,
    );
  }
}
