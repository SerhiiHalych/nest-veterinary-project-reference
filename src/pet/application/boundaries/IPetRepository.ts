import { Pet } from '../entities/Pet';

export interface IPetRepository {
  list(params?: {
    searchString?: string;
    withoutOwner: boolean;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    pets: Pet[];
    totalCount: number;
  }>;

  findById(id: number): Promise<Pet | null>;

  findByClientId(params: {
    clientId: number;
    searchString?: string;
  }): Promise<Pet[]>;
}
