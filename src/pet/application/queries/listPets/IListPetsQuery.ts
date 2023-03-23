import { PetGender } from '../../enums/PetGender';
import { PetSpecies } from '../../enums/PetSpecies';

export interface ListPetsQueryInput {
  search?: string;
  skip: number;
  take: number;
  withoutOwner: boolean;
}

export interface ListPetsQueryOutput {
  items: Array<{
    id: number;
    clientId: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    dob: Date;
  }>;
  totalCount: number;
}

export interface IListPetsQuery {
  execute(inputData: ListPetsQueryInput): Promise<ListPetsQueryOutput>;
}
