import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';

import { IAppointmentTypeRepository } from '../../application/boundaries/IAppointmentTypeRepository';
import { AppointmentType } from '../../application/entities/AppointmentType';
import { AppointmentTypeEntity } from './AppointmentTypeEntity';
import { AppointmentTypeMapper } from './AppointmentTypeMapper';

export class AppointmentTypeRepository
  extends TypeOrmRepository<AppointmentTypeEntity>
  implements IAppointmentTypeRepository
{
  public async findById(id: number): Promise<AppointmentType | null> {
    const appointmentEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!appointmentEntity) {
      return null;
    }

    return AppointmentTypeMapper.toDto(appointmentEntity);
  }
}
