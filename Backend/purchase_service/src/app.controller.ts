import { Controller } from '@nestjs/common';
import { PurchaseService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @MessagePattern({ cmd: 'paginate' })
  paginate(
    @Payload()
    {
      email,
      limit,
      offset,
      searchQuery,
    }: {
      email: string;
      limit: number;
      offset: number;
      searchQuery: string;
    },
  ) {
    return this.purchaseService.paginate(email, limit, offset, searchQuery);
  }

  @MessagePattern({ cmd: 'find_one' })
  async findOne(@Payload() data: { Id: string; email: string }) {
    const { Id, email } = data;
    return await this.purchaseService.findOne(Id, email);
  }
}
