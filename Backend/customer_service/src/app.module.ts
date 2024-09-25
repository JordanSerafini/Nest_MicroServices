import { Module } from '@nestjs/common';
import { CustomerService } from './app.service';
import { CustomerController } from './app.controller';
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
  controllers: [CustomerController],
  providers: [
    CustomerService,
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
export class CustomerModule {}
