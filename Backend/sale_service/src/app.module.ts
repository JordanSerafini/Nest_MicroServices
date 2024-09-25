import { Module } from '@nestjs/common';
import { SaleController } from './app.controller';
import { SaleService } from './app.service';
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
  controllers: [SaleController],
  providers: [
    SaleService,
    { provide: 'Logger', useClass: CustomLogger },
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
export class SaleModule {}
