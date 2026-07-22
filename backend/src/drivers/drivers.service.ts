import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver, DriverStatus } from './entities/driver.entity';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  async createDriver(driverData: Partial<Driver>): Promise<Driver> {
    const driver = this.driversRepository.create(driverData);
    return this.driversRepository.save(driver);
  }

  async getDriverById(id: string): Promise<Driver> {
    return this.driversRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async getAllDrivers(status?: DriverStatus): Promise<Driver[]> {
    if (status) {
      return this.driversRepository.find({ where: { status }, relations: ['user'] });
    }
    return this.driversRepository.find({ relations: ['user'] });
  }

  async updateDriverStatus(id: string, status: DriverStatus): Promise<Driver> {
    await this.driversRepository.update(id, { status });
    return this.getDriverById(id);
  }

  async addVehicle(driverId: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create(vehicleData);
    return this.vehiclesRepository.save(vehicle);
  }

  async getDriverVehicles(userId: string): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({ where: { driver: { id: userId } } });
  }

  async updateEarnings(driverId: string, amount: number): Promise<void> {
    await this.driversRepository.increment(
      { id: driverId },
      'earnings',
      amount,
    );
  }
}
