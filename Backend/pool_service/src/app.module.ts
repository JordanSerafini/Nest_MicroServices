import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PoolEBPModule } from './poolEBP.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PoolEBPModule,
  ],
  exports: [PoolEBPModule],
})
export class AppModule {}
export { PoolEBPModule };
