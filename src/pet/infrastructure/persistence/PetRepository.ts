import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';

import { IPetRepository } from '../../application/boundaries/IPetRepository';
import { Pet } from '../../application/entities/Pet';
import { PetEntity } from './PetEntity';
import { PetMapper } from './PetMapper';

export class PetRepository
  extends TypeOrmRepository<PetEntity>
  implements IPetRepository
{
  public async list(params?: {
    searchString?: string;
    withoutOwner: boolean;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    pets: Pet[];
    totalCount: number;
  }> {
    const {
      pagination = {
        skip: 0,
        take: 25,
      },
      searchString,
      withoutOwner,
    } = params || {};

    const queryBuilder = this.repository.createQueryBuilder('p').select();

    if (searchString) {
      const words = replaceWildcardCharacters(searchString).split(' ');

      words.forEach((word) => {
        queryBuilder.andWhere(
          `
            CONCAT(
              ' ', p.BREED,
              ' ', p.NAME
            ) LIKE N'%${word}%'
          `,
        );
      });
    }

    if (withoutOwner) {
      queryBuilder.andWhere('p.ID_CLIENT IS NULL');
    }

    const entities = await queryBuilder
      .skip(pagination.skip)
      .take(pagination.take)
      .getMany();

    const totalCount = await queryBuilder.getCount();

    return {
      pets: entities.map(PetMapper.toDto),
      totalCount,
    };
  }

  public async findById(id: number): Promise<Pet | null> {
    const petEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!petEntity) {
      return null;
    }

    return PetMapper.toDto(petEntity);
  }

  public async findByClientId(params: {
    clientId: number;
    searchString?: string;
  }): Promise<Pet[]> {
    const { clientId, searchString } = params;

    const queryBuilder = this.repository
      .createQueryBuilder('c')
      .select()
      .where('c.ID_CLIENT = :clientId', { clientId });

    if (searchString) {
      const words = replaceWildcardCharacters(searchString).split(' ');

      words.forEach((word) => {
        queryBuilder.andWhere(
          `
            CONCAT(
              ' ', c.BREED,
              ' ', c.NAME
            ) LIKE N'%${word}%'
          `,
        );
      });
    }

    const entities = await queryBuilder.getMany();

    return entities.map(PetMapper.toDto);
  }
}
