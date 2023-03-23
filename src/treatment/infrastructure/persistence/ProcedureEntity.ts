import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Procedures' })
export class ProcedureEntity {
  @PrimaryGeneratedColumn({ name: 'ID_PROCEDURES' })
  id: number;

  @Column('nvarchar', { length: '150', name: 'NAME' })
  name: string;

  @Column('float', { name: 'COST' })
  price: number;
}
