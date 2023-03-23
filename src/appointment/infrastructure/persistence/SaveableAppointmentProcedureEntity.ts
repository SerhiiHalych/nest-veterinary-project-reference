import type { OmitTyped } from '../../../common/types/OmitTyped';
import { AppointmentProcedureEntity } from './AppointmentProcedureEntity';

export type SaveableAppointmentProcedureEntity = OmitTyped<
  AppointmentProcedureEntity,
  'appointment' | 'id' | 'procedure' | 'appointmentId'
>;
