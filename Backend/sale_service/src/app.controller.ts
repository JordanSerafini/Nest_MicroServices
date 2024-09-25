import { Controller } from '@nestjs/common';
import { SaleService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SaleController {
  constructor(private readonly SaleService: SaleService) {}

  @MessagePattern({ cmd: 'find_one_SaleDocument' })
  findOne(@Payload() { Id, email }: { Id: string; email: string }) {
    return this.SaleService.findOne(Id, email);
  }

  @MessagePattern({ cmd: 'paginate' })
  paginate(
    @Payload()
    { email, page, limit }: { email: string; page: number; limit: number },
  ) {
    return this.SaleService.paginate(email, page, limit);
  }
}
