import { Logger, Module } from '@nestjs/common';
import { AuthService } from './app.service';
import { AuthController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
//import { PoolEBPModule as PoolModule } from '../../pool/poolEBP.module';
import { CustomLogger } from './logging/custom-logger.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      signOptions: { expiresIn: '60m' },
    }),
    PgConnectionModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: Logger, useClass: CustomLogger },
  ],
})
export class AppModule {}
