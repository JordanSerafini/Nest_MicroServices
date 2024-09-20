import { Module } from '@nestjs/common';
import { SaleController } from './app.controller';
import { SaleService } from './app.service';
import { CustomLogger } from './logging/custom-logger.service';
import { PoolModule } from '../pool.module';

@Module({
  imports: [PoolModule],
  controllers: [SaleController],
  providers: [SaleService, { provide: 'Logger', useClass: CustomLogger }],
})
export class SaleModule {}
