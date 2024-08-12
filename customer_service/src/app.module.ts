import { Module } from '@nestjs/common';
import { CustomerService } from './app.service';
import { CustomerController } from './app.controller';
import { PoolModule } from 'pool.module';

@Module({
  imports: [PoolModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
