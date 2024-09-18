import { NestFactory } from '@nestjs/core';
import { SaleModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SaleModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3012,
    },
  });
  app.listen();
  console.log('Sale service is listening on port 3012');
}
bootstrap();
