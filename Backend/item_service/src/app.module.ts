import { Logger, Module } from '@nestjs/common';
import { ItemService } from './app.service';
import { ItemController } from './app.controller';
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
  controllers: [ItemController],
  providers: [ItemService, { provide: Logger, useClass: CustomLogger }],
})
export class AppModule {}
