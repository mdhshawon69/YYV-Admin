/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'noreply@yy.ventures', // generated ethereal user
        pass: 'tvd~N@z_{3a^0Um', // generated ethereal password
      },
    });
  }

  async sendMail(options: SendMailOptions) {
    await this.transporter.sendMail(options);
  }

  async sendPasswordResetEmail(to: string, resetToken: string) {
    // const template = fs.readFileSync(

    // );
    const resetUrl = `localhost:3000/auth/forgot-password?token=${resetToken}`;
    // const compiledTemplate = handlebars.compile(template);
    // const html = compiledTemplate({ resetUrl });
    const tag = '<h1>Hello</h1>';

    const mailOptions: SendMailOptions = {
      from: 'YY Ventures" <noreply@yy.ventures>',
      to,
      subject: 'Password Reset',
      html: tag,
    };

    await this.sendMail(mailOptions);
  }
}
