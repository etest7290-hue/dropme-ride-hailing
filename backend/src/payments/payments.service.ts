import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentMethod } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.paymentsRepository.create(paymentData);
    return this.paymentsRepository.save(payment);
  }

  async getPaymentById(id: string): Promise<Payment> {
    return this.paymentsRepository.findOne({
      where: { id },
      relations: ['ride', 'user'],
    });
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { user: { id: userId } },
      relations: ['ride'],
      order: { createdAt: 'DESC' },
    });
  }

  async getRidePayments(rideId: string): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { ride: { id: rideId } },
      relations: ['user'],
    });
  }

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
    await this.paymentsRepository.update(id, { status });
    return this.getPaymentById(id);
  }

  async markAsPaid(id: string, transactionId: string): Promise<Payment> {
    await this.paymentsRepository.update(id, {
      status: PaymentStatus.SUCCESS,
      transactionId,
    });
    return this.getPaymentById(id);
  }

  async refundPayment(id: string): Promise<Payment> {
    await this.paymentsRepository.update(id, {
      status: PaymentStatus.REFUNDED,
    });
    return this.getPaymentById(id);
  }
}
