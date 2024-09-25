import { Module, Logger } from '@nestjs/common';
import { ChantierController } from './app.controller';
import { ChantierService } from './app.service';
import { CustomLogger } from './logging/chantier-logger.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PgConnectionModule,
  ],
  controllers: [ChantierController],
  providers: [ChantierService, { provide: Logger, useClass: CustomLogger }],
})
export class AppModule {}
