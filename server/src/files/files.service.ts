import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    const fileName = uuid.v4() + '.webp';
    const filePath = path.resolve('static', fileName);
    const buffer = await this.convertToWebP(file.buffer);

    try {
      await writeFile(filePath, buffer);
      return fileName;
    } catch (error) {
      console.error(error);
    }
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
