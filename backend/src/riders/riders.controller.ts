import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RidersService } from './riders.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Riders')
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getRider(@Param('id') id: string) {
    return this.ridersService.getRiderById(id);
  }

  @Post(':id/wallet/add')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addWalletBalance(@Param('id') id: string, @Body() body: { amount: number }) {
    await this.ridersService.addWalletBalance(id, body.amount);
    return { message: 'Wallet balance updated' };
  }
}
