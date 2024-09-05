import { Module, Logger } from '@nestjs/common';
import { StockController } from './app.controller';
import { StockService } from './app.service';
import { PoolModule } from './pool.module';
import { CustomLogger } from './logging/custom-logger.service';
import { createClient } from 'redis';

@Module({
  imports: [PoolModule],
  controllers: [StockController],
  providers: [
    StockService,
    { provide: Logger, useClass: CustomLogger },
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
export class AppModule {}
