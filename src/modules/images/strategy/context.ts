import Jimp from 'jimp';
import { ImageProcessStrategy } from './types';

export default class ImageProcessContext {
  constructor(private context: ImageProcessStrategy) {}

  setContext(context: ImageProcessStrategy): void {
    this.context = context;
  }

  applyContextLogic(jimpImage: Jimp): Jimp {
    return this.context.applyFilter(jimpImage);
  }
}
