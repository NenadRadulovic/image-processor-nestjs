import Jimp from 'jimp';
import { ImageProcessStrategy } from './types';

export default class BlackWhiteStrategy implements ImageProcessStrategy {
  applyFilter(jimpImage: Jimp): Jimp {
    return jimpImage.greyscale();
  }
}
