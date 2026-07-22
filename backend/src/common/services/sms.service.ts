import { Injectable } from '@nestjs/common';
const twilio = require('twilio');

@Injectable()
export class SmsService {
  private client: any;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    await this.client.messages.create({
      body: `Your DropMe OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }

  async sendRideNotification(
    phoneNumber: string,
    message: string,
  ): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }
}
