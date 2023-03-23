import { PetGender } from '../../../../pet/application/enums/PetGender';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';
import { Appetite } from '../../enums/Appetite';
import { Defecation } from '../../enums/Defecation';
import { GeneralState } from '../../enums/GeneralState';
import { HeartAuscultation } from '../../enums/HeartAuscultation';
import { LungAuscultation } from '../../enums/LungAuscultation';
import { Mucous } from '../../enums/Mucous';
import { SkinTurgor } from '../../enums/SkinTurgor';
import { Urination } from '../../enums/Urination';
import { Vomiting } from '../../enums/Vomiting';

export interface GetAppointmentQueryInput {
  id: number;
}

export interface GetAppointmentQueryOutput {
  id: number;
  appointmentTypeId: number;
  appointmentTypeName: string;
  appointmentTypePrice: number;
  date: Date | null;
  treatment: string | null;
  diagnosis: string | null;

  anamnesis: {
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
  } | null;

  // cost info
  totalCost: number;
  sale: number;

  // facility info
  facility: {
    id: number;
    address: string;
  };

  // pet info
  pet: {
    id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    isBiosterilized: boolean;
    dob: Date;
  } | null;

  // doctor info
  doctor: {
    id: number;
    firstName: string | null;
    lastName: string | null;
  } | null;

  client: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
  } | null;

  // used medication info
  medications: Array<{
    id: number;
    name: string;
    unit: string;
    amount: number;
    price: number;
    priceIncluded: boolean;
  }>;

  // applied procedures info
  procedures: Array<{
    id: number;
    name: string;
    sale: number;
    price: number;
    amount: number;
  }>;
}

export interface IGetAppointmentQuery {
  execute(
    inputData: GetAppointmentQueryInput,
  ): Promise<GetAppointmentQueryOutput>;
}
