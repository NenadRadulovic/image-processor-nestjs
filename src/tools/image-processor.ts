import Jimp from 'jimp';
import { join } from 'path';
import { Filters } from 'src/modules/images/images.types';

export const processImage = async (
  imageName,
  filters: Array<Filters>,
): Promise<string> => {
  const sourcePath = join(process.cwd(), 'storage', 'original', imageName);
  const jimpImage = await Jimp.read(sourcePath);
  applyFilters(jimpImage, filters);
  return imageName;
};

const applyFilters = (jimpImage: Jimp, filters: Array<Filters>) => {
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
};
