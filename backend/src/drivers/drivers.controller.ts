import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DriversService } from './drivers.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getAllDrivers() {
    return this.driversService.getAllDrivers();
  }

  @Get(':id')
  async getDriver(@Param('id') id: string) {
    return this.driversService.getDriverById(id);
  }

  @Post(':id/vehicle')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addVehicle(@Param('id') id: string, @Body() vehicleData: any) {
    return this.driversService.addVehicle(id, vehicleData);
  }

  @Get(':id/vehicles')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getVehicles(@Param('id') id: string) {
    return this.driversService.getDriverVehicles(id);
  }
}
