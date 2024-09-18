import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomersController } from './controllers/customers/customers.controller';
import { ItemsController } from './controllers/items/items.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { StockController } from './controllers/stock/stock.controller';
import { ChantierController } from './controllers/chantier/chantier.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ColleagueController } from './controllers/colleague/colleague.controller';
import { DealController } from './controllers/deal/deal.controller';
import { IncidentController } from './controllers/incident/incident.controller';
import { MaintenanceController } from './controllers/maintenance/maintenance.controller';
import { PurchaseController } from './controllers/purchase/purchase.controller';
import { SaleController } from './controllers/sale/sale.controller';
import { ScheduleController } from './controllers/schedule/schedule.controller';
import { SupplierController } from './controllers/supplier/supplier.controller';

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
        name: 'CHANTIER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'chantier_service',
          port: 3006,
        },
      },
      {
        name: 'COLLEAGUE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'colleague_service',
          port: 3007,
        },
      },
      {
        name: 'DEAL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'deal_service',
          port: 3008,
        },
      },
      {
        name: 'INCIDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'incident_service',
          port: 3009,
        },
      },
      {
        name: 'MAINTENANCE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'maintenance_service',
          port: 3010,
        },
      },
      {
        name: 'PURCHASE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'purchase_service',
          port: 3011,
        },
      },
      {
        name: 'SALE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'sale_service',
          port: 3012,
        },
      },
      {
        name: 'SCHEDULE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'schedule_service',
          port: 3013,
        },
      },
      {
        name: 'SUPPLIER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'supplier_service',
          port: 3014,
        },
      },
    ]),
  ],
  controllers: [
    CustomersController,
    ItemsController,
    AuthController,
    StockController,
    ChantierController,
    ColleagueController,
    DealController,
    IncidentController,
    MaintenanceController,
    PurchaseController,
    SaleController,
    ScheduleController,
    SupplierController,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
