import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@dropme.com',
      to,
      subject,
      html,
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const html = `
      <h2>Your OTP Code</h2>
      <p>Your one-time password (OTP) is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `;
    await this.sendEmail(to, 'DropMe - OTP Verification', html);
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `
      <h2>Welcome to DropMe!</h2>
      <p>Hi ${name},</p>
      <p>Welcome to DropMe - Your trusted ride-hailing platform.</p>
      <p>Thank you for signing up!</p>
    `;
    await this.sendEmail(to, 'Welcome to DropMe', html);
  }
}
