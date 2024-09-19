import { Module } from '@nestjs/common';
import { DealController } from './app.controller';
import { DealService } from './app.service';
import { PoolModule } from '../pool.module';
import { CustomLogger } from './logging/custom-logger.service';
import { createClient } from 'redis';

@Module({
  imports: [PoolModule],
  controllers: [DealController],
  providers: [
    DealService,
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
export class DealModule {}
