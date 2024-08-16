import { Module } from '@nestjs/common';
import { CustomerService } from './app.service';
import { CustomerController } from './app.controller';
import { PoolModule } from 'pool.module';
import { CustomLogger } from './logging/custom-logger.service';

@Module({
  imports: [PoolModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomLogger],
})
export class CustomerModule {}
