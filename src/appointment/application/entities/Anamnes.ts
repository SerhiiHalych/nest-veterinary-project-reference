import { Appetite } from '../enums/Appetite';
import { Defecation } from '../enums/Defecation';
import { GeneralState } from '../enums/GeneralState';
import { HeartAuscultation } from '../enums/HeartAuscultation';
import { LungAuscultation } from '../enums/LungAuscultation';
import { Mucous } from '../enums/Mucous';
import { SkinTurgor } from '../enums/SkinTurgor';
import { Urination } from '../enums/Urination';
import { Vomiting } from '../enums/Vomiting';

export interface Anamnesis {
  description: string | null;
  generalState: GeneralState;
  temperature: number | null;
  appetite: Appetite;
  vomiting: Vomiting;
  defecation: Defecation;
  urination: Urination;
  mucous: Mucous;
  skinTurgor: SkinTurgor;
  heartAuscultation: HeartAuscultation;
  lungAuscultation: LungAuscultation;
  notes: string | null;
}
