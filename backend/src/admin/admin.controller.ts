import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PricingType } from './entities/pricing.entity';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Pricing endpoints
  @Get('pricing')
  async getAllPricing() {
    return this.adminService.getAllPricing();
  }

  @Get('pricing/:type')
  async getPricing(@Param('type') type: PricingType) {
    return this.adminService.getPricing(type);
  }

  @Post('pricing')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createPricing(@Body() pricingData: any) {
    return this.adminService.createPricing(pricingData);
  }

  @Put('pricing/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updatePricing(@Param('id') id: string, @Body() pricingData: any) {
    return this.adminService.updatePricing(id, pricingData);
  }

  // Support Ticket endpoints
  @Post('support-tickets')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createSupportTicket(@Body() ticketData: any) {
    return this.adminService.createSupportTicket(ticketData);
  }

  @Get('support-tickets')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAllSupportTickets() {
    return this.adminService.getAllSupportTickets();
  }

  @Get('support-tickets/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getSupportTicket(@Param('id') id: string) {
    return this.adminService.getSupportTicket(id);
  }

  @Put('support-tickets/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updateSupportTicket(@Param('id') id: string, @Body() ticketData: any) {
    return this.adminService.updateSupportTicket(id, ticketData);
  }
}
