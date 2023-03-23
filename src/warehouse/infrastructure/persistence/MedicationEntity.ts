import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Medicines' })
export class MedicationEntity {
  @PrimaryGeneratedColumn({ name: 'ID_MEDICINE' })
  id: number;

  @Column('nvarchar', { length: '100', name: 'NAME' })
  name: string;

  @Column('nvarchar', { length: '10', name: 'UNIT' })
  unit: string;

  @Column('float', { name: 'CURRENT_PRICE' })
  lastPrice: number;
}
