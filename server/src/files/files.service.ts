import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('static', fileName);

      await writeFile(filePath, file.buffer);
      return fileName;
    } catch (error) {
      console.error(error);
    }
  }
}
