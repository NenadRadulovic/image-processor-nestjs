import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'storage'), {
    index: false,
    prefix: 'storage',
  });
  app.use(urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
