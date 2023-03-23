import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Anamnes' })
export class AnamnesisEntity {
  @PrimaryGeneratedColumn({ name: 'ID_ANAMNES' })
  id: number;

  @Column('nvarchar', { length: 'MAX', name: 'DESCRIPTION', nullable: true })
  description: string | null;

  @Column('tinyint', { name: 'GENERAL_STATE', nullable: true })
  generalState: number;

  @Column('float', { name: 'TEMPERATURE', nullable: true })
  temperature: number | null;

  @Column('tinyint', { name: 'APPETITE', nullable: true })
  appetite: number;

  @Column('tinyint', { name: 'VOMMITING', nullable: true })
  vomiting: number;

  @Column('tinyint', { name: 'DEFECATION', nullable: true })
  defecation: number;

  @Column('tinyint', { name: 'URINATION', nullable: true })
  urination: number;

  @Column('tinyint', { name: 'MUCOCUTANEOUS', nullable: true })
  mucous: number;

  @Column('tinyint', { name: 'SKIN_TURGOR', nullable: true })
  skinTurgor: number;

  @Column('tinyint', { name: 'HEART_AUSCULTATION', nullable: true })
  heartAuscultation: number;

  @Column('tinyint', { name: 'LUNGS_AUSCULTATION', nullable: true })
  lungAuscultation: number;

  @Column('nvarchar', { length: 'MAX', name: 'ADDICTIVE_INFO', nullable: true })
  notes: string | null;
}
