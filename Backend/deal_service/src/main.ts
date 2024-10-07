import { NestFactory } from '@nestjs/core';
import { DealModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DealModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3015,
    },
  });
  app.listen();
  console.log('Deal service is listening on port 3015');
}
bootstrap();
