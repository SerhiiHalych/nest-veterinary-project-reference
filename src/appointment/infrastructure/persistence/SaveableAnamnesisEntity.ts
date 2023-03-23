import type { OmitTyped } from '../../../common/types/OmitTyped';
import { AnamnesisEntity } from './AnamnesisEntity';

export type SaveableAnamnesisEntity = OmitTyped<AnamnesisEntity, 'id'> & {
  id?: number;
};
