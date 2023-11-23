import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Filters } from './images.types';
import { FilesInterceptor } from '@nestjs/platform-express';
import OriginalImageService from './factory/image.original.factory';
import ProcessedImageService from './factory/image.processed.factory';

@Controller('images')
export class ImagesController {
  constructor(
    private originalImageService: OriginalImageService,
    private processedImageService: ProcessedImageService,
  ) {}

  @Get('/:dir/:name')
  getImage(
    @Param('dir') image_dir: string,
    @Param('name') image_name: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    res.set({ 'Content-Type': 'image/jpeg' });

    const file = this.originalImageService.getImage(image_dir, image_name);
    return new StreamableFile(file);
  }

  @Post('/process-images')
  @UseInterceptors(FilesInterceptor('images'))
  async processImages(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() reqBody,
    @Res() res: Response,
  ) {
    res.set({ 'Content-Type': 'application/json' });

    const filters: Array<Filters> = reqBody.filters.map((f) => JSON.parse(f));

    const originalImagePaths = await this.originalImageService.saveImages(
      images,
    );
    const imageUrls = this.originalImageService.generateUrl(originalImagePaths);

    await this.processedImageService.saveImages(originalImagePaths, filters);
    const processedImagesUrls =
      this.processedImageService.generateUrl(originalImagePaths);

    return res
      .status(200)
      .json({ originals: imageUrls, processed: processedImagesUrls });
  }
}
