import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Création d'une application HTTP classique
  const app = await NestFactory.create(AppModule);

  // Définir le port pour écouter les requêtes HTTP
  const port = 3005;

  // Démarrer l'application sur le port spécifié
  await app.listen(port);
  console.log(`Application is listening on http://localhost:${port}`);
}

bootstrap();

/*

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3005,
    },
  });
  app.listen();
  console.log('Synchro service is listening on port 3005');
}

*/
