import { NestFactory } from '@nestjs/core';
import { DealModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DealModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3008,
    },
  });
  app.listen();
  console.log('Customer service is listening on port 3008');
}
bootstrap();
