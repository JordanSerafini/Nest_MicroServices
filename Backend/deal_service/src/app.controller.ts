import { Controller } from '@nestjs/common';
import { DealService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class DealController {
  constructor(private readonly dealService: DealService) {}

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
    return await this.dealService.paginate(email, searchQuery, limit, offset);
  }
}
