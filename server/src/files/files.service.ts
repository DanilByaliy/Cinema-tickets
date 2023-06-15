import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import * as uuid from 'uuid';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { readFile, unlink, writeFile } from 'fs/promises';
import * as sharp from 'sharp';
import * as PDFDocument from 'pdfkit';

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

  async convertToJpeg(imageWebPPath: string, imageJpegPath: string) {
    const file = await readFile(imageWebPPath);
    const buffer = await sharp(file).jpeg().toBuffer();
    await writeFile(imageJpegPath, buffer);
  }

  async createPDF(info: TicketInfo) {
    const fileName = 'ticket_' + uuid.v4() + '.pdf';
    const filePath = path.resolve('pdfs', fileName);

    const imageWebPPath = path.resolve('static', info.image);
    const imageJpegPath = imageWebPPath.replace('webp', 'jpeg');
    await this.convertToJpeg(imageWebPPath, imageJpegPath);
    info.image = imageJpegPath;

    const pdfDoc = new PDFDocument();
    this.drawTicket(pdfDoc, info);
    await this.savePdfToFile(pdfDoc, filePath);

    unlink(imageJpegPath);
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

  drawTicket(pdfDoc: typeof PDFDocument, info: TicketInfo) {
    const filePath = path.resolve('static', info.image);
    pdfDoc.image(filePath, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    });
    pdfDoc.fontSize(22);
    pdfDoc.text('Cinema-tickets', 350, 100);
    pdfDoc.text(info.movie);
    pdfDoc.text(`Your row: ${info.row}`);
    pdfDoc.text(`Your seat: ${info.seat}`);
    pdfDoc.text(`${info.date}, ${info.time}`);
  }
}