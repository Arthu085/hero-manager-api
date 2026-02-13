import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './core/config/cors/cors.config';
import { envConfig } from './core/config/env/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.setGlobalPrefix('api');

  await app.listen(envConfig.PORT);
}
bootstrap();
