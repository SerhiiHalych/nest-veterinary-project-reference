import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClientEntity } from '../../../client/infrastructure/persistence/ClientEntity';

@Entity({ name: 'Animals' })
export class PetEntity {
  @PrimaryGeneratedColumn({ name: 'ID_ANIMAL' })
  id: number;

  @Column({ name: 'ID_CLIENT' })
  clientId: number;

  @Column('nvarchar', { length: 'MAX', name: 'NAME' })
  name: string;

  @Column('nvarchar', { length: 'MAX', name: 'SPECIES' })
  species: 'Собака' | 'Кот';

  @Column('nvarchar', { length: 'MAX', name: 'BREED', nullable: true })
  breed: string;

  @Column('nvarchar', { length: 'MAX', name: 'GENDER', nullable: true })
  gender: 'He' | 'She';

  @Column('smallint', { name: 'BIOSTERILIZED', nullable: true })
  isBiosterilized: 0 | 1;

  @Column('datetimeoffset', { name: 'DATE_BORN', nullable: true })
  dob: Date;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'ID_CLIENT' })
  client: ClientEntity;
}
