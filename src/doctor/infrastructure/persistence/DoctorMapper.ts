import { Doctor } from '../../application/entities/Doctor';
import { DoctorEntity } from './DoctorEntity';

export class DoctorMapper {
  static toDto(from: DoctorEntity): Doctor {
    const { address, firstName, id, lastName, patronymic, phoneNumber } = from;

    return new Doctor({
      address,
      firstName,
      id,
      lastName,
      patronymic,
      phoneNumber,
    });
  }

  static toEntity(from: Doctor): DoctorEntity {
    const { address, firstName, id, lastName, patronymic, phoneNumber } = from;

    return {
      address,
      firstName,
      id,
      lastName,
      patronymic,
      phoneNumber,
    };
  }
}
