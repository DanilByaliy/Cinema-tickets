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
}
