import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListClientsQuery,
  ListClientsQueryInput,
  ListClientsQueryOutput,
} from './IListClientsQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListClientsQuery
  extends Query<ListClientsQueryInput, ListClientsQueryOutput>
  implements IListClientsQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListClientsQueryInput,
  ): Promise<ListClientsQueryOutput> {
    const { skip, take, search } = inputData;

    const { clients, totalCount } = await this._dbContext.clientRepository.list(
      {
        pagination: {
          skip,
          take,
        },
        searchString: search,
      },
    );

    return {
      totalCount,
      items: clients.map((client) => ({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        address: client.address,
        phoneNumber: client.phoneNumber,
      })),
    };
  }
}
