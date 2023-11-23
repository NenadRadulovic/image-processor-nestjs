import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ReadStream, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { processImage } from 'src/tools/image-processor';
import { Filters } from './images.types';
import OriginalImageService from './factory/image.original.factory';
import ProcessedImageService from './factory/image.processed.factory';

@Injectable()
export class ImagesService {
  constructor(
    private originalImageService: OriginalImageService,
    private processedImageService: ProcessedImageService,
  ) {}
  getImage(image_dir: string, image_name: string): ReadStream {
    const imageLocation = join(process.cwd(), 'storage', image_dir, image_name);
    const file = createReadStream(imageLocation);
    return file;
  }
  async saveImages(images: any): Promise<Array<string>> {
    const promises = [];
    images.forEach((image) => {
      const imageName = `${randomUUID()}-${image.originalname}`;
      const imageLocation = join(
        process.cwd(),
        'storage',
        'original',
        imageName,
      );
      const stream = createWriteStream(imageLocation);
      stream.write(image.buffer);
      stream.close();
      promises.push(
        new Promise((resolve, reject) => {
          stream.on('finish', () => resolve(`${imageName}`));
          stream.on('error', reject);
        }),
      );
    });
    return Promise.all(promises);
  }

  generateUrl(
    dir: string,
    imagePaths: Array<string>,
    req: Request,
  ): Array<string> {
    const protocol = req.protocol;
    const host = req.get('Host');
    const fullUrl = protocol + '://' + host + '/images/' + dir;
    return imagePaths.map((imagePath) => `${fullUrl}/${imagePath}`);
  }

  async applyFilters(
    filters: Array<Filters>,
    images: Array<string>,
  ): Promise<Array<string>> {
    const proccessedImages = [];
    images.forEach(async (image) => {
      const path = await processImage(image, filters);
      proccessedImages.push(path);
    });
    return proccessedImages;
  }
}
