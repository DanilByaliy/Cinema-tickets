import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { File } from '../interfaces/file.interface';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;
  private readonly SERVICE = this.configService.get('TRANSPORTER_SERVICE');
  private readonly USER = this.configService.get('TRANSPORTER_USER');
  private readonly PASSWORD = this.configService.get('TRANSPORTER_PASSWORD');
  private readonly FROM = this.configService.get('TRANSPORTER_FROM');

  constructor(private configService: ConfigService) {
    this.transporter = this.getTransporter();
  }

  getTransporter() {
    return nodemailer.createTransport(
      {
        service: this.SERVICE,
        auth: {
          user: this.USER,
          pass: this.PASSWORD,
        },
      },
      { from: this.FROM },
    );
  }

  async send(reciver: string, files: File[]) {
    try {
      const { messageId } = await this.transporter.sendMail({
        to: reciver,
        subject: 'Cinema-ticket',
        text: 'Welcome to our cinema',
        attachments: files.map((file) => {
          return {
            filename: file.name,
            path: file.path,
          };
        }),
      });
      return messageId;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sendVerificationLetter(reciver: string, userId: string, token: string) {
    try {
      const { messageId } = await this.transporter.sendMail({
        to: reciver,
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello!</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/auth/verify${userId}/${token}>Click here</a>
        </div>`,
      });
      return messageId;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
