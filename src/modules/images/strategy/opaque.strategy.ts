import Jimp from 'jimp';
import { ImageProcessStrategy } from './types';

export default class OpaqueStrategy implements ImageProcessStrategy {
  applyFilter(jimpImage: Jimp): Jimp {
    return jimpImage.opaque();
  }
}
