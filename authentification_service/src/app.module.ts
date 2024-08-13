import { Module } from '@nestjs/common';
import { AuthService } from './app.service';
import { AuthController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PoolModule } from 'pool.module';

@Module({
  imports: [
    PoolModule,
    JwtModule.register({
      secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
