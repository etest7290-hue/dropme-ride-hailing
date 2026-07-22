import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PricingType {
  BIKE = 'bike',
  CAR = 'car',
}

@Entity('pricing')
export class Pricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PricingType,
  })
  type: PricingType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseFare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerKm: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  waitingChargePerMin: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  nightChargePercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minimumFare: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
