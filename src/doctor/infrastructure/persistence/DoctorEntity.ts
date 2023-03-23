import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Doctor' })
export class DoctorEntity {
  @PrimaryGeneratedColumn({ name: 'ID_DOCTOR' })
  id: number;

  @Column('nvarchar', { length: 'MAX', name: 'NAME', nullable: true })
  firstName: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'SURNAME', nullable: true })
  lastName: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'PATRONYMIC', nullable: true })
  patronymic: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'ADDRESS', nullable: true })
  address: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'TELEPHONE', nullable: true })
  phoneNumber: string | null;
}
