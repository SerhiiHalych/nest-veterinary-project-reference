import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  GetClientQueryInput,
  GetClientQueryOutput,
  IGetClientQuery,
} from './IGetClientQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class GetClientQuery
  extends Query<GetClientQueryInput, GetClientQueryOutput>
  implements IGetClientQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: GetClientQueryInput,
  ): Promise<GetClientQueryOutput> {
    const { id } = inputData;

    const client = await this._dbContext.clientRepository.findById(id);

    if (!client) {
      throw new Error('Client not found');
    }

    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      address: client.address,
      phoneNumber: client.phoneNumber,
    };
  }
}
