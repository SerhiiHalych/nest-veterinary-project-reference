import type { OmitTyped } from '../../../common/types/OmitTyped';
import type { PetEntity } from './PetEntity';

export type SaveablePetEntity = OmitTyped<PetEntity, 'client' | 'id'> & {
  id?: number;
};
