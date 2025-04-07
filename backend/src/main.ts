import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем CORS
  app.enableCors({
    origin: true, // Разрешает запросы со всех доменов
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
