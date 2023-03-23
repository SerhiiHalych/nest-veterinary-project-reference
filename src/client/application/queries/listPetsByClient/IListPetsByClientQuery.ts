import { PetGender } from '../../../../pet/application/enums/PetGender';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export interface ListPetsByClientQueryInput {
  clientId: number;
  search?: string;
}

export interface ListPetsByClientQueryOutput {
  items: Array<{
    id: number;
    clientId: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    isBiosterilized: boolean;
    dob: Date;
  }>;
}

export interface IListPetsByClientQuery {
  execute(
    inputData: ListPetsByClientQueryInput,
  ): Promise<ListPetsByClientQueryOutput>;
}
