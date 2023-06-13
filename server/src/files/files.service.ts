import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import * as sharp from 'sharp';
import * as PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';

@Injectable()
export class FilesService {
  async saveImage(file: Express.Multer.File) {
    const mimetype = file.mimetype;

    if (!mimetype.includes('image')) {
      throw new HttpException(
        'Unsupported media type. Only image files are allowed.',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
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

  async createPDF() {
    const fileName = 'ticket_' + uuid.v4() + '.pdf';
    const filePath = path.resolve('pdfs', fileName);

    const pdfDoc = new PDFDocument();
    await this.savePdfToFile(pdfDoc, filePath);
    return {
      fileName,
    };
  }

  savePdfToFile(pdf: typeof PDFDocument, fileName: string): Promise<void> {
    return new Promise<void>((resolve) => {
      let pendingStepCount = 2;
      const stepFinished = () => {
        if (--pendingStepCount == 0) {
          resolve();
        }
      };

      const writeStream = createWriteStream(fileName);
      writeStream.on('close', stepFinished);
      pdf.pipe(writeStream);

      pdf.end();
      stepFinished();
    });
  }
}
