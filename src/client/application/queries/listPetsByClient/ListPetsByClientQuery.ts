import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListPetsByClientQuery,
  ListPetsByClientQueryInput,
  ListPetsByClientQueryOutput,
} from './IListPetsByClientQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListPetsByClientQuery
  extends Query<ListPetsByClientQueryInput, ListPetsByClientQueryOutput>
  implements IListPetsByClientQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListPetsByClientQueryInput,
  ): Promise<ListPetsByClientQueryOutput> {
    const { clientId, search } = inputData;

    const pets = await this._dbContext.petRepository.findByClientId({
      clientId,
      searchString: search,
    });

    return {
      items: pets.map((pet) => ({
        id: pet.id,
        clientId: pet.clientId,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        gender: pet.gender,
        isBiosterilized: pet.isBiosterilized,
        dob: pet.dob,
      })),
    };
  }
}
