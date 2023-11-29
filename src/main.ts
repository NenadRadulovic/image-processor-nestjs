import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { urlencoded } from 'express';

async function bootstrap() {
  console.log(process.env.URL_IMAGE_PATH);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'storage'), {
    index: false,
    prefix: 'storage',
  });
  app.use(urlencoded({ extended: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
