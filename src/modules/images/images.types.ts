export class ProcessImagesRequest {
  filters: Array<Filters>;
  modifications: ModificationInterface;
}

export interface Filters {
  name: ImageProcessingOptions;
  options?: string | number | object;
}
export interface ModificationInterface {
  crop: string;
  rotate: number;
  printText: PrintTextInterface;
}
export interface PrintTextInterface {
  text: string;
  positionX: number;
  positionY: number;
}

type BlackWhite = 'Black/White';
type Opaque = 'Opaque';
type Posterize = 'Posterize';
type ImageProcessingOptions = BlackWhite | Opaque | Posterize;

export const storageFolder = 'storage';
export const processedImageFolder = 'processed';
export const originalImageFolder = 'original';
