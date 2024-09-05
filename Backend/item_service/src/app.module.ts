import { Logger, Module } from '@nestjs/common';
import { ItemService } from './app.service';
import { ItemController } from './app.controller';
import { PoolModule } from './pool.module';
import { CustomLogger } from './logging/custom-logger.service';

@Module({
  imports: [PoolModule],
  controllers: [ItemController],
  providers: [ItemService, { provide: Logger, useClass: CustomLogger }],
})
export class AppModule {}
