import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SupplierModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3014,
    },
  });
  app.listen();
  console.log('Supplier service is listening on port 3014');
}
bootstrap();
