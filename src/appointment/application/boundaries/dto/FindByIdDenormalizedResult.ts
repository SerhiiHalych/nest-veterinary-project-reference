import { PetGender } from '../../../../pet/application/enums/PetGender';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export interface FindByIdDenormalizedResult {
  id: number;
  appointmentTypeId: number;
  appointmentTypeName: number;
  date: Date | null;
  treatment: string;
  diagnosis: string;

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
  };

  // doctor info
  doctor: {
    id: number;
    firstName: string | null;
    lastName: string | null;
  } | null;

  // used medication info
  medications: Array<{
    id: number;
    name: string;
    unit: string;
    amount: number;
  }>;

  // used medication info
  procedures: Array<{
    id: number;
    name: string;
    amount: number;
  }>;
}
