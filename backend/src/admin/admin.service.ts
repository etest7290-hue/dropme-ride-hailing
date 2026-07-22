import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricing, PricingType } from './entities/pricing.entity';
import { SupportTicket, SupportTicketStatus } from './entities/support-ticket.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Pricing)
    private pricingRepository: Repository<Pricing>,
    @InjectRepository(SupportTicket)
    private supportTicketRepository: Repository<SupportTicket>,
  ) {}

  // Pricing Management
  async getPricing(type: PricingType): Promise<Pricing> {
    return this.pricingRepository.findOne({ where: { type, isActive: true } });
  }

  async getAllPricing(): Promise<Pricing[]> {
    return this.pricingRepository.find({ where: { isActive: true } });
  }

  async updatePricing(id: string, pricingData: Partial<Pricing>): Promise<Pricing> {
    await this.pricingRepository.update(id, pricingData);
    return this.pricingRepository.findOne({ where: { id } });
  }

  async createPricing(pricingData: Partial<Pricing>): Promise<Pricing> {
    const pricing = this.pricingRepository.create(pricingData);
    return this.pricingRepository.save(pricing);
  }

  // Support Ticket Management
  async createSupportTicket(ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    const ticket = this.supportTicketRepository.create(ticketData);
    return this.supportTicketRepository.save(ticket);
  }

  async getSupportTicket(id: string): Promise<SupportTicket> {
    return this.supportTicketRepository.findOne({ where: { id } });
  }

  async getAllSupportTickets(status?: SupportTicketStatus): Promise<SupportTicket[]> {
    if (status) {
      return this.supportTicketRepository.find({ where: { status } });
    }
    return this.supportTicketRepository.find();
  }

  async updateSupportTicket(id: string, ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    await this.supportTicketRepository.update(id, ticketData);
    return this.getSupportTicket(id);
  }
}
