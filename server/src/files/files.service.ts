import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import * as uuid from 'uuid';
import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { readFile, unlink, writeFile } from 'fs/promises';
import * as sharp from 'sharp';
import * as PDFDocument from 'pdfkit';
import { Seat } from 'src/interfaces/seat.interface';

@Injectable()
export class FilesService {
  async saveImage(image: Express.Multer.File) {
    const mimetype = image.mimetype;

    if (!mimetype.includes('image')) {
      throw new HttpException(
        'Unsupported media type. Only image files are allowed.',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    const fileName = uuid.v4() + '.webp';
    const filePath = resolve('static', fileName);
    const buffer = await this.convertToWebP(image.buffer);

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

  async createPDF(info: TicketInfo & Seat) {
    const name = 'ticket_' + uuid.v4() + '.pdf';
    const path = resolve('pdfs', name);

    const imageWebPPath = resolve('static', info.poster);
    const imageJpegPath = imageWebPPath.replace('webp', 'jpeg');
    await this.convertToJpeg(imageWebPPath, imageJpegPath);
    info.poster = imageJpegPath;
    console.log(info.poster);

    const pdfDoc = new PDFDocument();
    this.drawTicket(pdfDoc, info);
    await this.savePdfToFile(pdfDoc, path);

    unlink(imageJpegPath);
    return { name, path };
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

  drawTicket(pdfDoc: typeof PDFDocument, info: TicketInfo & Seat) {
    const filePath = resolve('static', info.poster);
    pdfDoc.image(filePath, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    });
    pdfDoc.fontSize(22);
    pdfDoc.text('Cinema-tickets', 350, 100);
    pdfDoc.text(info.title);
    pdfDoc.text(`Your row: ${info.row}`);
    pdfDoc.text(`Your seat: ${info.seat}`);
    pdfDoc.text(`${info.date}, ${info.time}`);
  }
}
