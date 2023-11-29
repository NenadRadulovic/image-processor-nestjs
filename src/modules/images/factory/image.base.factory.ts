import { ReadStream, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

export default class ImageFactory {
  protected path: string;
  protected url: string;
  protected promises: Array<Promise<any>>;

  constructor(path: string, url: string) {
    this.path = path;
    this.url = url;
  }

  async writeImageToStorageAsync(
    imageName: string,
    buffer: Buffer,
  ): Promise<string> {
    const imageLocation = join(this.path, imageName);
    const stream = createWriteStream(imageLocation);
    stream.write(buffer);
    stream.close();
    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`${imageName}`));
      stream.on('error', reject);
    });
  }

  generateUrl(imagePaths: Array<string>): Array<string> {
    return imagePaths.map((imagePath) => `${this.url}/${imagePath}`);
  }

  getImage(imageName: string): ReadStream {
    const file = createReadStream(join(this.path, imageName));
    return file;
  }
}
