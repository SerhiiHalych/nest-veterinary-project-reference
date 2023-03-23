import { AppointmentType } from '../entities/AppointmentType';

export interface IAppointmentTypeRepository {
  findById(id: number): Promise<AppointmentType | null>;
}
