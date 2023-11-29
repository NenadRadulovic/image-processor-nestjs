import { Injectable } from '@nestjs/common';
import ImageFactory from './image.base.factory';
import { randomUUID } from 'crypto';
import { originalImageFolder } from '../images.types';
import {
  getOriginalFolderPath,
  getUrlImagePath,
} from 'src/helpers/name-resolver';

Injectable();
export default class OriginalImageService extends ImageFactory {
  constructor() {
    const path = getOriginalFolderPath();
    const fullUrl = getUrlImagePath(originalImageFolder);
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
