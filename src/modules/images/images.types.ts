export class ProcessImagesRequest {
  filters: Array<Filters>;
  modifications: ModificationInterface;
}

export interface Filters {
  name: string;
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
