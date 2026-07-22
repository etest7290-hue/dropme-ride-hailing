import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { S3Service } from './services/s3.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { GoogleMapsService } from './services/google-maps.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '7d' },
    }),
    PassportModule,
  ],
  providers: [JwtStrategy, S3Service, EmailService, SmsService, GoogleMapsService],
  exports: [JwtModule, PassportModule, S3Service, EmailService, SmsService, GoogleMapsService],
})
export class CommonModule {}
