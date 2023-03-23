import type { OmitTyped } from '../../../common/types/OmitTyped';
import { AppointmentMedicationEntity } from './AppointmentMedicationEntity';

export type SaveableAppointmentMedicationEntity = OmitTyped<
  AppointmentMedicationEntity,
  'appointment' | 'id' | 'medication' | 'appointmentId'
>;
