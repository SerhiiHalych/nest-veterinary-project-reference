import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Offices' })
export class FacilityEntity {
  @PrimaryGeneratedColumn({ name: 'ID_OFFICE' })
  id: number;

  @Column('nvarchar', { length: 'MAX', name: 'ADDRESS' })
  address: string;

  @Column('nchar', { length: '20', name: 'TELEPHONE1', nullable: true })
  primaryPhoneNumber: string | null;

  @Column('nchar', { length: '20', name: 'TELEPHONE2', nullable: true })
  secondaryPhoneNumber: string | null;

  @Column('int', { name: 'NUMBER' })
  number: number;
}
