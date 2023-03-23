import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListPetsQuery,
  ListPetsQueryInput,
  ListPetsQueryOutput,
} from './IListPetsQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListPetsQuery
  extends Query<ListPetsQueryInput, ListPetsQueryOutput>
  implements IListPetsQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListPetsQueryInput,
  ): Promise<ListPetsQueryOutput> {
    const { skip, take, search, withoutOwner } = inputData;

    const { pets, totalCount } = await this._dbContext.petRepository.list({
      pagination: {
        skip,
        take,
      },
      searchString: search,
      withoutOwner,
    });

    return {
      totalCount,
      items: pets.map((pet) => ({
        id: pet.id,
        clientId: pet.clientId,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        gender: pet.gender,
        dob: pet.dob,
      })),
    };
  }
}
