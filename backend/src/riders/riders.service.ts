import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './entities/rider.entity';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private ridersRepository: Repository<Rider>,
  ) {}

  async createRider(riderData: Partial<Rider>): Promise<Rider> {
    const rider = this.ridersRepository.create(riderData);
    return this.ridersRepository.save(rider);
  }

  async getRiderById(id: string): Promise<Rider> {
    return this.ridersRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async addWalletBalance(riderId: string, amount: number): Promise<void> {
    await this.ridersRepository.increment(
      { id: riderId },
      'walletBalance',
      amount,
    );
  }

  async deductWalletBalance(riderId: string, amount: number): Promise<void> {
    await this.ridersRepository.decrement(
      { id: riderId },
      'walletBalance',
      amount,
    );
  }
}
