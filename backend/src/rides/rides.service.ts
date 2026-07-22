import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride, RideStatus, VehicleType } from './entities/ride.entity';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private ridesRepository: Repository<Ride>,
  ) {}

  async requestRide(rideData: Partial<Ride>): Promise<Ride> {
    const ride = this.ridesRepository.create(rideData);
    return this.ridesRepository.save(ride);
  }

  async getRideById(id: string): Promise<Ride> {
    return this.ridesRepository.findOne({
      where: { id },
      relations: ['rider', 'driver'],
    });
  }

  async getRiderRides(riderId: string): Promise<Ride[]> {
    return this.ridesRepository.find({
      where: { rider: { id: riderId } },
      relations: ['driver'],
      order: { createdAt: 'DESC' },
    });
  }

  async getDriverRides(driverId: string): Promise<Ride[]> {
    return this.ridesRepository.find({
      where: { driver: { id: driverId } },
      relations: ['rider'],
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveRides(vehicleType?: VehicleType): Promise<Ride[]> {
    const query = this.ridesRepository
      .createQueryBuilder('ride')
      .where('ride.status = :status', { status: RideStatus.REQUESTED });

    if (vehicleType) {
      query.andWhere('ride.vehicleType = :vehicleType', { vehicleType });
    }

    return query.getMany();
  }

  async acceptRide(rideId: string, driverId: string): Promise<Ride> {
    await this.ridesRepository.update(rideId, {
      driver: { id: driverId },
      status: RideStatus.ACCEPTED,
    });
    return this.getRideById(rideId);
  }

  async startRide(rideId: string): Promise<Ride> {
    await this.ridesRepository.update(rideId, {
      status: RideStatus.STARTED,
      startedAt: new Date(),
    });
    return this.getRideById(rideId);
  }

  async completeRide(rideId: string, finalFare: number): Promise<Ride> {
    await this.ridesRepository.update(rideId, {
      status: RideStatus.COMPLETED,
      finalFare,
      completedAt: new Date(),
    });
    return this.getRideById(rideId);
  }

  async cancelRide(rideId: string): Promise<Ride> {
    await this.ridesRepository.update(rideId, {
      status: RideStatus.CANCELLED,
    });
    return this.getRideById(rideId);
  }
}
