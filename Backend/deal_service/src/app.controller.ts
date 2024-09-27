import { Controller, Get } from '@nestjs/common';
import { DealService } from './app.service';

@Controller()
export class DealController {
  constructor(private readonly appService: DealService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
