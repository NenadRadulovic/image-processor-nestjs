import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesMiddleware } from './images.middleware';
import OriginalImageService from './factory/image.original.factory';
import ProcessedImageService from './factory/image.processed.factory';

@Module({
  providers: [OriginalImageService, ProcessedImageService],
  controllers: [ImagesController],
})
export class ImagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImagesMiddleware)
      .forRoutes({ path: 'images/:dir/:name', method: RequestMethod.GET });
  }
}
