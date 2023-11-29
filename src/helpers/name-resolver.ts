import { join } from 'path';
import {
  originalImageFolder,
  processedImageFolder,
  storageFolder,
} from 'src/modules/images/images.types';

export const getOriginalFolderPath = (): string =>
  join(process.cwd(), storageFolder, originalImageFolder);

export const getProcessedFolderPath = (): string =>
  join(process.cwd(), storageFolder, processedImageFolder);

export const getUrlImagePath = (imageType: string): string =>
  `${process.env.URL_IMAGE_PATH}/${imageType}`;
