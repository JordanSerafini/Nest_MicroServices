import { Module } from '@nestjs/common';
import { MainteananceController } from './app.controller';
import { MaintenanceService } from './app.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './logging/custom-logger.service';
import { createClient } from 'redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [MainteananceController],
  providers: [
    MaintenanceService,
    CustomLogger,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          url: process.env.REDIS_URL || 'redis://localhost:6379',
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class MaintenanceModule {}
