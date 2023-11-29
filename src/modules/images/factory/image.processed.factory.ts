import { Injectable } from '@nestjs/common';
import ImageFactory from './image.base.factory';
import { join } from 'path';
import Jimp from 'jimp';
import { Filters, processedImageFolder } from 'src/modules/images/images.types';
import ImageProcessContext from '../strategy/context';
import { ImageProcessStrategy } from '../strategy/types';
import BlackWhiteStrategy from '../strategy/blackwhite.strategy';
import OpaqueStrategy from '../strategy/opaque.strategy';
import PosterizeStrategy from '../strategy/posterize.strategy';
import {
  getProcessedFolderPath,
  getUrlImagePath,
} from 'src/helpers/name-resolver';

Injectable();
export default class ProcessedImageService extends ImageFactory {
  constructor(private context: ImageProcessContext) {
    const path = getProcessedFolderPath();
    const fullUrl = getUrlImagePath(processedImageFolder);
    super(path, fullUrl);
    this.context = new ImageProcessContext(new BlackWhiteStrategy());
  }

  async saveImages(
    imageNames: Array<string>,
    filters: Array<Filters>,
  ): Promise<Array<void>> {
    this.promises = [];
    imageNames.forEach(async (img) => {
      const sourcePath = join(process.cwd(), 'storage', 'original', img);
      let jimpImage = await Jimp.read(sourcePath);
      filters.forEach((filter) => {
        this.context.setContext(this.createContext(filter));
        jimpImage = this.context.applyContextLogic(jimpImage);
      });
      this.promises.push(jimpImage.writeAsync(join(this.path, img)));
    });
    return Promise.all(this.promises);
  }

  createContext(filter: Filters): ImageProcessStrategy {
    switch (filter.name) {
      case 'Black/White':
        return new BlackWhiteStrategy();
      case 'Opaque':
        return new OpaqueStrategy();
      case 'Posterize':
        return new PosterizeStrategy(filter.options as number);
      default:
        break;
    }
  }
}
