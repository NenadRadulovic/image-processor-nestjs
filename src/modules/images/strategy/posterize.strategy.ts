import Jimp from 'jimp';
import { ImageProcessStrategy } from './types';

export default class PosterizeStrategy implements ImageProcessStrategy {
  constructor(private options: number) {}

  applyFilter(jimpImage: Jimp): Jimp {
    return jimpImage.posterize(this.options);
  }
}
