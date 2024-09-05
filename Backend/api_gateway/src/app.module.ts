import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomersController } from './controllers/customers/customers.controller';
import { ItemsController } from './controllers/items/items.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      signOptions: { expiresIn: '60m' },
    }),
    ClientsModule.register([
      {
        name: 'ITEM_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'item_service',
          port: 3001,
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
        name: 'AUTHENTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'authentification_service',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [CustomersController, ItemsController, AuthController],
  providers: [JwtAuthGuard],
})
export class AppModule {}
