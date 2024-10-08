import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para permitir el origen del frontend
  app.enableCors({
    origin: '*', // Cambia esto al origen de tu frontend
    credentials: true, // Permite el uso de cookies
  });

  app.setGlobalPrefix('api');

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || envs.port);

  //console.log(`Running on port ${envs.port}`);
}
bootstrap();
