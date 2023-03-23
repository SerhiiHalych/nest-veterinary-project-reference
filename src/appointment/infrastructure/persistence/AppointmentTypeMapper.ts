import { AppointmentType } from '../../application/entities/AppointmentType';
import { AppointmentTypeEntity } from './AppointmentTypeEntity';
import { SaveableAppointmentTypeEntity } from './SaveableAppointmentTypeEntity';

export class AppointmentTypeMapper {
  static toDto(from: AppointmentTypeEntity): AppointmentType {
    const { id, price, isActive, name, secondaryCost } = from;

    return new AppointmentType({
      id,
      price,
      isActive: isActive === 1,
      name,
      secondaryCost,
    });
  }

  static toEntity(from: AppointmentType): SaveableAppointmentTypeEntity {
    const { price, id, isActive, name, secondaryCost } = from;

    return {
      price,
      isActive: isActive ? 1 : 0,
      name,
      secondaryCost,
      id,
    };
  }
}
