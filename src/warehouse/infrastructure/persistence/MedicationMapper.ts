import { Medication } from '../../application/entities/Medication';
import { MedicationEntity } from './MedicationEntity';

export class MedicationMapper {
  static toDto(from: MedicationEntity): Medication {
    const { id, lastPrice, name, unit } = from;

    return new Medication({
      id,
      lastPrice,
      name,
      unit,
    });
  }

  static toEntity(from: Medication): MedicationEntity {
    const { id, lastPrice, name, unit } = from;

    return {
      id,
      lastPrice,
      name,
      unit,
    };
  }
}
