import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ScheduleModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3013,
    },
  });
  app.listen();
  console.log('Schedule service is listening on port 3013');
}
bootstrap();
