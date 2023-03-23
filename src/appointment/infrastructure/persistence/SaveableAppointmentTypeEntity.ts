import type { OmitTyped } from '../../../common/types/OmitTyped';
import type { AppointmentTypeEntity } from './AppointmentTypeEntity';

export type SaveableAppointmentTypeEntity = OmitTyped<
  AppointmentTypeEntity,
  'id'
> & {
  id?: number;
};
