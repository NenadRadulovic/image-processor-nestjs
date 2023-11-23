import { Injectable } from '@nestjs/common';
import ImageFactory from './image.base.factory';
import { join } from 'path';
import { randomUUID } from 'crypto';

Injectable();
export default class OriginalImageService extends ImageFactory {
  constructor() {
    const path = join(process.cwd(), 'storage', 'original');
    const fullUrl = 'http://localhost:3000/images/original';
    super(path, fullUrl);
  }

  async saveImages(images: Array<Express.Multer.File>): Promise<Array<string>> {
    this.promises = [];
    images.forEach((image) => {
      const imageName = `${randomUUID()}-${image.originalname}`;
      this.promises.push(
        this.writeImageToStorageAsync(imageName, image.buffer),
      );
    });

    return Promise.all(this.promises);
  }
}
