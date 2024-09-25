import { Module } from '@nestjs/common';
import { ScheduleController } from './app.controller';
import { ScheduleService } from './app.service';
import { CustomLogger } from './logging/custom-logger.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, { provide: 'Logger', useClass: CustomLogger }],
})
export class ScheduleModule {}
