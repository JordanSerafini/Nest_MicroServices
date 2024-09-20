import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connexion au microservice item_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  // Connexion au microservice customer_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });

  // Connexion au microservice authentification_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3003,
    },
  });

  // Connexion au microservice stock_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3004,
    },
  });

  // Connexion au microservice chantier_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3006,
    },
  });

  // Connexion au microservice colleague_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3007,
    },
  });

  // Connexion au microservice deal_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3015,
    },
  });

  // Connexion au microservice incident_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3009,
    },
  });

  // Connexion au microservice maintenance_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3010,
    },
  });

  // Connexion au microservice purchase_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3011,
    },
  });

  // Connexion au microservice sale_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3012,
    },
  });

  // Connexion au microservice schedule_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3013,
    },
  });

  // Connexion au microservice supplier_service
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3014,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
