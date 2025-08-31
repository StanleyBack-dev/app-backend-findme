import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { corsConfig } from './config/cors.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(corsConfig);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}/graphql`);
}
bootstrap();