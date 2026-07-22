import { Controller, Get, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RidesService } from './rides.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Rides')
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('request')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async requestRide(@Body() rideData: any, @Req() req: any) {
    rideData.rider = { id: req.user.userId };
    return this.ridesService.requestRide(rideData);
  }

  @Get('available')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAvailableRides() {
    return this.ridesService.getActiveRides();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getRide(@Param('id') id: string) {
    return this.ridesService.getRideById(id);
  }

  @Post(':id/accept')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async acceptRide(@Param('id') id: string, @Req() req: any) {
    return this.ridesService.acceptRide(id, req.user.userId);
  }

  @Post(':id/start')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async startRide(@Param('id') id: string) {
    return this.ridesService.startRide(id);
  }

  @Post(':id/complete')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async completeRide(@Param('id') id: string, @Body() body: { finalFare: number }) {
    return this.ridesService.completeRide(id, body.finalFare);
  }

  @Post(':id/cancel')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async cancelRide(@Param('id') id: string) {
    return this.ridesService.cancelRide(id);
  }

  @Get('rider/:riderId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getRiderRides(@Param('riderId') riderId: string) {
    return this.ridesService.getRiderRides(riderId);
  }

  @Get('driver/:driverId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getDriverRides(@Param('driverId') driverId: string) {
    return this.ridesService.getDriverRides(driverId);
  }
}
