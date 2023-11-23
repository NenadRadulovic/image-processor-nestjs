import { Injectable } from '@nestjs/common';
import ImageFactory from './image.base.factory';
import { join } from 'path';
import Jimp from 'jimp';
import { Filters } from 'src/modules/images/images.types';

Injectable();
export default class ProcessedImageService extends ImageFactory {
  constructor() {
    const path = join(process.cwd(), 'storage', 'processed');
    const fullUrl = 'http://localhost:3000/images/processed';
    super(path, fullUrl);
  }

  async saveImages(
    imageNames: Array<string>,
    filters: Array<Filters>,
  ): Promise<void> {
    imageNames.forEach(async (img) => {
      const sourcePath = join(process.cwd(), 'storage', 'original', img);
      const jimpImage = await Jimp.read(sourcePath);
      this.applyFilters(jimpImage, filters);
      await jimpImage.writeAsync(join(this.path, img));
    });
  }

  applyFilters(jimpImage: Jimp, filters: Array<Filters>) {
    filters.forEach((filter) => {
      switch (filter.name) {
        case 'Black/White':
          jimpImage.greyscale();
          break;
        case 'Opaque':
          jimpImage.opaque();
          break;
        case 'Posterize':
          jimpImage.posterize(filter.options as number);
          break;
        default:
          break;
      }
    });
  }
}
