import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(
    session({
      secret: 'test',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3001);
}
bootstrap();
