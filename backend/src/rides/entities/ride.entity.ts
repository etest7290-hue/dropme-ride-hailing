import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum RideStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  STARTED = 'started',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum VehicleType {
  BIKE = 'bike',
  CAR = 'car',
}

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  rider: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  driver: User;

  @Column()
  pickupLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  pickupLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  pickupLng: number;

  @Column()
  dropoffLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  dropoffLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  dropoffLng: number;

  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.CAR,
  })
  vehicleType: VehicleType;

  @Column({
    type: 'enum',
    enum: RideStatus,
    default: RideStatus.REQUESTED,
  })
  status: RideStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedFare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  finalFare: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  distance: number;

  @Column({ type: 'int', default: 0 })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
