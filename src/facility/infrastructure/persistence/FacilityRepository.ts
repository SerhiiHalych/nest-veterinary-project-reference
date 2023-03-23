import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';

import { IFacilityRepository } from '../../application/boundaries/IFacilityRepository';
import { Facility } from '../../application/entities/Facility';
import { FacilityEntity } from './FacilityEntity';
import { FacilityMapper } from './FacilityMapper';

export class FacilityRepository
  extends TypeOrmRepository<FacilityEntity>
  implements IFacilityRepository
{
  public async list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    facilities: Facility[];
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
      facilities: entities.map(FacilityMapper.toDto),
      totalCount,
    };
  }

  public async findById(id: number): Promise<Facility | null> {
    const facilityEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!facilityEntity) {
      return null;
    }

    return FacilityMapper.toDto(facilityEntity);
  }
}
