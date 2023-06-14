import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;
  private readonly SERVICE = this.configService.get('TRANSPORTER_SERVICE');
  private readonly USER = this.configService.get('TRANSPORTER_USER');
  private readonly PASSWORD = this.configService.get('TRANSPORTER_PASSWORD');
  private readonly FROM = this.configService.get('TRANSPORTER_FROM');

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport(
      {
        service: this.SERVICE,
        auth: {
          user: this.USER,
          pass: this.PASSWORD,
        },
      },
      {
        from: this.FROM,
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
