/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { resolve } from 'path';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private template: handlebars.TemplateDelegate;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.office365.com',
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
    const resetUrl =
      `http://localhost:3000/auth/reset-password?token=${resetToken}`.toString();
    const templateContent = fs.readFileSync(
      resolve('./views/email_template.hbs'),
      'utf-8',
    );
    this.template = handlebars.compile(templateContent);
    const html = this.template({ resetUrl: resetUrl });
    const mailOptions: SendMailOptions = {
      from: '"YY Ventures Admin" <noreply@yy.ventures>',
      to,
      subject: 'Password Reset',
      html: html,
    };

    await this.sendMail(mailOptions);
  }
}
