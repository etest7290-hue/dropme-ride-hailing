import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  driver: User;

  @Column()
  type: 'bike' | 'car';

  @Column()
  registrationNumber: string;

  @Column()
  company: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  seatingCapacity: number;

  @Column()
  manufacturingYear: number;

  @Column({ nullable: true })
  registrationDocument: string;

  @Column({ nullable: true })
  insuranceDocument: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
