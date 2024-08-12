import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CustomerModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  });
  app.listen();
  console.log('Customer service is listening on port 3001');
}
bootstrap();
