import { NestFactory } from '@nestjs/core';
import { IncidentModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(IncidentModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3009,
    },
  });
  app.listen();
  console.log('Incident service is listening on port 3009');
}
bootstrap();
