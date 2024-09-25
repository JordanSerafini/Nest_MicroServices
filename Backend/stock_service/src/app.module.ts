import { Module, Logger } from '@nestjs/common';
import { StockController } from './app.controller';
import { StockService } from './app.service';
import { CustomLogger } from './logging/custom-logger.service';
import { createClient } from 'redis';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
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
