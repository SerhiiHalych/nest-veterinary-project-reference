import { PetGender } from '../../enums/PetGender';
import { PetSpecies } from '../../enums/PetSpecies';

export interface GetPetQueryInput {
  id: number;
}

export interface GetPetQueryOutput {
  id: number;
  owner: {
    id: number;
    firstName: string | null;
    lastName: string | null;
  } | null;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  isBiosterilized: boolean;
  dob: Date;
}

export interface IGetPetQuery {
  execute(inputData: GetPetQueryInput): Promise<GetPetQueryOutput>;
}
