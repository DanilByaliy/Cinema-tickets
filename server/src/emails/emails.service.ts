import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: '',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
      {
        from: '',
      },
    );
  }

  async send(reciver: string) {
    try {
      const info = await this.transporter.sendMail({
        to: reciver,
        subject: 'Cinema-ticket',
        text: 'Welcome to our cinema',
      });
      return info.messageId;
    } catch (error) {
      return error;
    }
  }
}
