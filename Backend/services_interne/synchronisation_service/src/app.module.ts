import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolMSSQLModule } from './pool/poolMSSQL.module';
import { PoolEBPModule } from './pool/poolEBP.module';
import { PoolBarrachinLModule } from './pool/barrachin.module';

@Module({
  imports: [PoolMSSQLModule, PoolEBPModule, PoolBarrachinLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
