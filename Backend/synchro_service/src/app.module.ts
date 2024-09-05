import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolMSSQLModule } from './pool/mssqlClient.module';
import { PoolEBPModule } from './pool/poolEBP.module';

@Module({
  imports: [PoolMSSQLModule, PoolEBPModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
