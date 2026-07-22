import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to phone number' })
  async sendOtp(@Body() body: { phoneNumber: string }) {
    const otp = await this.authService.generateOtp();
    // TODO: Send OTP via SMS service
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  async verifyOtp(@Body() body: { phoneNumber: string; otp: string }) {
    return this.authService.verifyOtp(body.phoneNumber, body.otp);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Refresh JWT token' })
  async refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
