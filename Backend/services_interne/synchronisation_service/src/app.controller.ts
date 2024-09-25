import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //* --------------------------------------------------------------------------------------------------------------------------------------
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

  @Get('item-counts')
  async getItemCounts() {
    try {
      const counts = await this.appService.getItemsCounts();
      return {
        message: 'Item counts retrieved successfully',
        mssqlCount: counts.mssqlCount,
        pgCount: counts.pgCount,
      };
    } catch (error) {
      return {
        message: 'Error retrieving item counts',
        error: error.message,
      };
    }
  }

  //* --------------------------------------------------------------------------------------------------------------------------------------
  @Get('customerEBP-sync')
  async syncCustomers() {
    try {
      const result = await this.appService.syncCustomersEbpToPg();
      return {
        message: 'Customers synchronized successfully',
        result,
      };
    } catch (error) {
      return {
        message: 'Error synchronizing customers',
        error: error.message,
      };
    }
  }

  @Get('itemEBP-sync')
  async syncItems() {
    try {
      const result = await this.appService.syncItemsEbpToPg();
      return {
        message: 'Items synchronized successfully',
        result,
      };
    } catch (error) {
      return {
        message: 'Error synchronizing items',
        error: error.message,
      };
    }
  }

  //* --------------------------------------------------------------------------------------------------------------------------------------
  @Get('info')
  async getInfo() {
    const result = await this.appService.getInfoFromBarrachin();
    if (result.error) {
      return {
        message: 'Error retrieving information',
        error: result.error,
      };
    }
    return {
      message: 'Information retrieved successfully',
      info: result.info,
    };
  }
}
