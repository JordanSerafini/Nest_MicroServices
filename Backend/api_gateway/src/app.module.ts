import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomersController } from './controllers/customers/customers.controller';
import { ItemsController } from './controllers/items/items.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { StockController } from './controllers/stock/stock.controller';
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
      {
        name: 'STOCK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'stock_service',
          port: 3004,
        },
      },
      {
        name: 'SYNCHRO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'synchro_service',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [
    CustomersController,
    ItemsController,
    AuthController,
    StockController,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
