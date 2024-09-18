import { Controller, Get } from '@nestjs/common';
import { DealService } from './app.service';

@Controller()
export class DealController {
  constructor(private readonly DealService: DealService) {}

  @Get()
  getHello(): string {
    return this.DealService.getHello();
  }
}
