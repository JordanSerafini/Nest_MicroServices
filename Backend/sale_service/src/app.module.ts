import { Module } from '@nestjs/common';
import { SaleController } from './app.controller';
import { SaleService } from './app.service';
import { CustomLogger } from './logging/custom-logger.service';
// import { PoolModule } from '../pool.module';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [SaleController],
  providers: [SaleService, { provide: 'Logger', useClass: CustomLogger }],
})
export class SaleModule {}
