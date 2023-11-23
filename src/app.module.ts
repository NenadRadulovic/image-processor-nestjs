import { Module } from '@nestjs/common';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
