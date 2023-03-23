import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProcedureEntity } from '../../../treatment/infrastructure/persistence/ProcedureEntity';
import { AppointmentEntity } from './AppointmentEntity';

@Entity({ name: 'Reception_Procedure' })
export class AppointmentProcedureEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'ID_PROCEDURES' })
  procedureId: number;

  @Column('int', { name: 'ID_RECEPTION' })
  appointmentId: number;

  @Column('int', { name: 'COUNT', nullable: true })
  amount: number;

  @Column('int', { name: 'SALE', nullable: true })
  sale: number;

  @ManyToOne(() => AppointmentEntity)
  @JoinColumn({ name: 'ID_RECEPTION' })
  appointment: AppointmentEntity;

  @ManyToOne(() => ProcedureEntity)
  @JoinColumn({ name: 'ID_PROCEDURES' })
  procedure: ProcedureEntity;
}
