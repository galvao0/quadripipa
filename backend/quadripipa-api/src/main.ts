import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: 'http://192.168.0.7:4200', credentials: true });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
