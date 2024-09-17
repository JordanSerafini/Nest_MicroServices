import { Module, Logger } from '@nestjs/common';
import { ChantierController } from './app.controller';
import { ChantierService } from './app.service';
import { PoolModule } from '../pool.module';
import { CustomLogger } from './logging/chantier-logger.service';

@Module({
  imports: [PoolModule],
  controllers: [ChantierController],
  providers: [ChantierService, { provide: Logger, useClass: CustomLogger }],
})
export class AppModule {}
