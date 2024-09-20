import { Module } from '@nestjs/common';
import { ScheduleController } from './app.controller';
import { ScheduleService } from './app.service';
import { CustomLogger } from './logging/custom-logger.service';
import { PoolModule } from '../pool.module';

@Module({
  imports: [PoolModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, { provide: 'Logger', useClass: CustomLogger }],
})
export class ScheduleModule {}
