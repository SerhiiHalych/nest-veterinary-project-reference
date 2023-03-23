import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MedicationEntity } from './MedicationEntity';

@Entity({ name: 'Admission' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('float', { name: 'ID_OFFICE' })
  facilityId: number;

  @Column('float', { name: 'ID_MEDICINE' })
  medicationId: number;

  @Column('float', { name: 'COUNT' })
  amount: number;

  @Column('float', { name: 'PRICE_BUY' })
  priceBuy: number;

  @Column('float', { name: 'PRICE_SELL' })
  priceSell: number;

  @Column('float', { name: 'DATE' })
  date: Date;

  @ManyToOne(() => MedicationEntity)
  medication: MedicationEntity;
}
