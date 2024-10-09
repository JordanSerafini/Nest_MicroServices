import { Module } from '@nestjs/common';
import { PurchaseController } from './app.controller';
import { PurchaseService } from './app.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';
import { createClient } from 'redis';
import { CustomLogger } from './logging/custom-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
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
export class PurchaseModule {}
