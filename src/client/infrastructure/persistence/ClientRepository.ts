import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';

import { IClientRepository } from '../../application/boundaries/IClientRepository';
import { Client } from '../../application/entities/Client';
import { ClientEntity } from './ClientEntity';
import { ClientMapper } from './ClientMapper';

export class ClientRepository
  extends TypeOrmRepository<ClientEntity>
  implements IClientRepository
{
  public async list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    clients: Client[];
    totalCount: number;
  }> {
    const {
      pagination = {
        skip: 0,
        take: 25,
      },
      searchString,
    } = params || {};

    const queryBuilder = this.repository.createQueryBuilder('c').select();

    if (searchString) {
      const words = replaceWildcardCharacters(searchString).split(' ');

      words.forEach((word) => {
        queryBuilder.andWhere(
          `
            CONCAT(
              ' ', c.SURNAME,
              ' ', c.NAME
            ) LIKE N'%${word}%'
          `,
        );
      });
    }

    const entities = await queryBuilder
      .skip(pagination.skip)
      .take(pagination.take)
      .getMany();

    const totalCount = await queryBuilder.getCount();

    return {
      clients: entities.map(ClientMapper.toDto),
      totalCount,
    };
  }

  public async findById(id: number): Promise<Client | null> {
    const clientEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!clientEntity) {
      return null;
    }

    return ClientMapper.toDto(clientEntity);
  }
}
