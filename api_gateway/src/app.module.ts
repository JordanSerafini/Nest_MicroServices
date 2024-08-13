import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'authentification_service',
          port: 3003,
        },
      },
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3002,
        },
      },
      {
        name: 'ITEM_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'item_service',
          port: 3001,
        },
      },
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
