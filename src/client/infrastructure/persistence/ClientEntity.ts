import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn({ name: 'ID_CLIENT' })
  id: number;

  @Column('nvarchar', { length: 'MAX', name: 'SURNAME', nullable: true })
  firstName: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'NAME', nullable: true })
  lastName: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'PATRONYMIC', nullable: true })
  patronymic: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'ADDRESS', nullable: true })
  address: string | null;

  @Column('nvarchar', { length: 'MAX', name: 'PHONE_NUMBER', nullable: true })
  phoneNumber: string | null;
}
