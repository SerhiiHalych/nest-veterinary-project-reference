import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { DoctorEntity } from '../../../doctor/infrastructure/persistence/DoctorEntity';
import { FacilityEntity } from '../../../facility/infrastructure/persistence/FacilityEntity';
import { PetEntity } from '../../../pet/infrastructure/persistence/PetEntity';
import { AnamnesisEntity } from './AnamnesisEntity';
import { AppointmentMedicationEntity } from './AppointmentMedicationEntity';
import { AppointmentProcedureEntity } from './AppointmentProcedureEntity';

@Entity({ name: 'Receptions' })
export class AppointmentEntity {
  @PrimaryGeneratedColumn({ name: 'ID_RECEPTION' })
  id: number;

  @Column({ name: 'ID_OFFICE' })
  facilityId: number;

  @Column({ name: 'ID_ANIMAL' })
  petId: number;

  @Column({ name: 'ID_RT' })
  appointmentTypeId: number;

  @Column({ name: 'ID_ANAMNES' })
  anamnesisId: number;

  @Column({ name: 'ID_DOCTOR' })
  doctorId: number;

  @Column({ name: 'ID_DVUSER' })
  userId: number;

  @Column('int', { name: 'SICK_LEAVE' })
  sickLeave: number;

  @Column('tinyint', { name: 'SICK_LEAVE_STATUS' })
  sickLeaveStatus: number;

  @Column('nvarchar', { length: 'MAX', name: 'DIAGNOSIS', nullable: true })
  diagnosis: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'TREATMENT', nullable: true })
  treatment: string | null;

  @Column('float', { name: 'TOTAL_COST' })
  totalCost: number;

  @Column('float', { name: 'SALE' })
  sale: number;

  @Column('date', { name: 'DATE', nullable: true })
  date: Date | null;

  @ManyToOne(() => PetEntity)
  @JoinColumn({ name: 'ID_ANIMAL' })
  pet: PetEntity;

  @ManyToOne(() => DoctorEntity)
  @JoinColumn({ name: 'ID_DOCTOR' })
  doctor: DoctorEntity;

  @ManyToOne(() => FacilityEntity)
  @JoinColumn({ name: 'ID_OFFICE' })
  facility: FacilityEntity;

  @OneToOne(() => AnamnesisEntity, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'ID_ANAMNES' })
  anamnesis: AnamnesisEntity;

  @OneToMany(
    () => AppointmentMedicationEntity,
    (medication) => medication.appointment,
    { eager: true },
  )
  medications: AppointmentMedicationEntity[];

  @OneToMany(
    () => AppointmentProcedureEntity,
    (procedure) => procedure.appointment,
    { eager: true },
  )
  procedures: AppointmentProcedureEntity[];
}
