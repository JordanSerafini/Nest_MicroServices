import { NestFactory } from '@nestjs/core';
import { PurchaseModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PurchaseModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3011,
    },
  });
  app.listen();
  console.log('Purchase service is listening on port 3011');
}
bootstrap();
