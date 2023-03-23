import type { OmitTyped } from '../../../common/types/OmitTyped';
import type { AppointmentEntity } from './AppointmentEntity';
import { SaveableAnamnesisEntity } from './SaveableAnamnesisEntity';
import { SaveableAppointmentMedicationEntity } from './SaveableAppointmentMedicationEntity';
import { SaveableAppointmentProcedureEntity } from './SaveableAppointmentProcedureEntity';

export type SaveableAppointmentEntity = OmitTyped<
  AppointmentEntity,
  | 'pet'
  | 'id'
  | 'anamnesis'
  | 'doctor'
  | 'anamnesisId'
  | 'facility'
  | 'medications'
  | 'procedures'
> & {
  id?: number;
  anamnesis: SaveableAnamnesisEntity | null;
  medications: SaveableAppointmentMedicationEntity[];
  procedures: SaveableAppointmentProcedureEntity[];
};
