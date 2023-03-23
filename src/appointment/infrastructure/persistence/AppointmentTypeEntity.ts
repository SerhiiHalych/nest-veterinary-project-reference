import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ReceptionType' })
export class AppointmentTypeEntity {
  @PrimaryGeneratedColumn({ name: 'ID_RT' })
  id: number;

  @Column('nvarchar', { length: '100', name: 'NAME', nullable: true })
  name: string;

  @Column('float', { name: 'COST' })
  price: number;

  @Column('float', { name: 'SECOND_COST' })
  secondaryCost: number;

  @Column('tinyint', { name: 'ACTIVE' })
  isActive: number;
}
