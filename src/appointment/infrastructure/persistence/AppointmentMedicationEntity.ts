import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicationEntity } from '../../../warehouse/infrastructure/persistence/MedicationEntity';
import { AppointmentEntity } from './AppointmentEntity';

@Entity({ name: 'Reception_Medicine' })
export class AppointmentMedicationEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'ID_MEDICINE' })
  medicationId: number;

  @Column('int', { name: 'ID_RECEPTION' })
  appointmentId: number;

  @Column('float', { name: 'AMOUNT', nullable: true })
  amount: number;

  @Column('tinyint', { name: 'IN_PRICE' })
  priceIncluded: number;

  @ManyToOne(() => AppointmentEntity)
  @JoinColumn({ name: 'ID_RECEPTION' })
  appointment: AppointmentEntity;

  @ManyToOne(() => MedicationEntity)
  @JoinColumn({ name: 'ID_MEDICINE' })
  medication: MedicationEntity;
}
