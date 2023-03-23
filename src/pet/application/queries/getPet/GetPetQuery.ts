import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  GetPetQueryInput,
  GetPetQueryOutput,
  IGetPetQuery,
} from './IGetPetQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class GetPetQuery
  extends Query<GetPetQueryInput, GetPetQueryOutput>
  implements IGetPetQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: GetPetQueryInput,
  ): Promise<GetPetQueryOutput> {
    const { id } = inputData;

    const pet = await this._dbContext.petRepository.findById(id);

    if (!pet) {
      throw new Error('Pet not found');
    }

    const client = await this._dbContext.clientRepository.findById(
      pet.clientId,
    );

    return {
      id: pet.id,
      owner: client
        ? {
            firstName: client.firstName,
            id: client.id,
            lastName: client.lastName,
          }
        : null,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      gender: pet.gender,
      isBiosterilized: pet.isBiosterilized,
      dob: pet.dob,
    };
  }
}
