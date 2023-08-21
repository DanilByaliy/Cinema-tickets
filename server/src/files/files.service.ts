import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketInfo } from 'src/interfaces/ticket-info.interface';
import * as uuid from 'uuid';
import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { readFile, readdir, unlink, writeFile } from 'fs/promises';
import * as sharp from 'sharp';
import * as PDFDocument from 'pdfkit';
import { Seat } from 'src/interfaces/seat.interface';

@Injectable()
export class FilesService {
  async saveImage(image: Express.Multer.File) {
    this.validateFileType(image, 'image');
    const fileName = this.generateFullFileName('webp');
    await this.storeImage(image.buffer, fileName);
    return fileName;
  }

  private validateFileType(file: Express.Multer.File, type: string) {
    const mimetype = file.mimetype;
    if (!mimetype.includes(type)) {
      throw new HttpException(
        `Unsupported media type. Only ${type} files are allowed.`,
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
  }

  private generateFullFileName(format: string, name?: string) {
    const fileName = name || uuid.v4();
    return `${fileName}.${format}`;
  }

  private async storeImage(buffer: Buffer, fileName: string) {
    const filePath = resolve('static', fileName);
    const convertedBuffer = await this.convertToWebP(buffer);
    await writeFile(filePath, convertedBuffer);
  }

  private async convertToWebP(file: Buffer) {
    return sharp(file).webp().toBuffer();
  }

  private async convertToJpeg(file: Buffer) {
    return sharp(file).jpeg().toBuffer();
  }

  async saveVideo(video: Express.Multer.File, id: string) {
    this.validateFileType(video, 'video');
    const fileName = this.generateFullFileName('mp4', id);
    const filePath = resolve('videos', fileName);
    await writeFile(filePath, video.buffer);
    return fileName;
  }

  async removeVideo(name: string) {
    const fileName = this.generateFullFileName('mp4', name);
    const filePath = resolve('videos', fileName);
    await unlink(filePath);
  }

  async getFileNames(dirname: string) {
    const dirPath = resolve(dirname);
    const files = await readdir(dirPath);
    return files.map((value) => value.substring(0, 36));
  }

  parseVideoRange(videoRange: string, size: number) {
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      return { start, end, chunksize };
    }
    return null;
  }

  async createPDFTickets(info: TicketInfo, seats: Seat[]) {
    const imageJpegPath = await this.convertImageToJpegAndSave(info.poster);
    info.poster = imageJpegPath;

    const files = await Promise.all(
      seats.map((seat) => this.createPDFTicket({ ...seat, ...info })),
    );

    unlink(imageJpegPath);
    return files;
  }

  private async convertImageToJpegAndSave(poster: string) {
    const imageWebPPath = resolve('static', poster);
    const imageJpegPath = imageWebPPath.replace('webp', 'jpeg');

    const webpBuffer = await readFile(imageWebPPath);
    const jpegBuffer = await this.convertToJpeg(webpBuffer);
    await writeFile(imageJpegPath, jpegBuffer);
    return imageJpegPath;
  }

  private async createPDFTicket(info: TicketInfo & Seat) {
    const name = 'ticket_' + this.generateFullFileName('pdf');
    const path = resolve('pdfs', name);

    const pdfDoc = this.drawTicket(info);
    await this.savePdfToFile(pdfDoc, path);

    return { name, path };
  }

  private savePdfToFile(pdf: typeof PDFDocument, fileName: string) {
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

  private drawTicket(info: TicketInfo & Seat) {
    const pdfDoc = new PDFDocument();
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
    return pdfDoc;
  }
}
