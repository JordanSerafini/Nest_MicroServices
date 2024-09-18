import { NestFactory } from '@nestjs/core';
import { ColleagueModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ColleagueModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3007,
    },
  });
  app.listen();
  console.log('Colleague service is listening on port 3007');
}
bootstrap();
