import { Module } from '@nestjs/common';
import { ItemService } from './app.service';
import { ItemController } from './app.controller';
import { PoolModule } from './pool.module';

@Module({
  imports: [PoolModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class AppModule {}
