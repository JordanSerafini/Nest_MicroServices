import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('customer-counts')
  async getCustomerCounts() {
    try {
      const counts = await this.appService.getCustomerCounts();
      return {
        message: 'Customer counts retrieved successfully',
        mssqlCount: counts.mssqlCount,
        pgCount: counts.pgCount,
      };
    } catch (error) {
      return {
        message: 'Error retrieving customer counts',
        error: error.message,
      };
    }
  }
}
