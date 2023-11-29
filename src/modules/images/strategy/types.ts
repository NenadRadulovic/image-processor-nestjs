import Jimp from 'jimp';

export interface ImageProcessStrategy {
  applyFilter(jimpImage: Jimp): Jimp;
}
