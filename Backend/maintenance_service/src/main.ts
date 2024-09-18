import { NestFactory } from '@nestjs/core';
import { MaintenanceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MaintenanceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3010,
    },
  });
  app.listen();
  console.log('Maintenance service is listening on port 3010');
}
bootstrap();
