import { In } from 'typeorm';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';

import { IMedicationRepository } from '../../application/boundaries/IMedicationRepository';
import { Medication } from '../../application/entities/Medication';
import { MedicationEntity } from './MedicationEntity';
import { MedicationMapper } from './MedicationMapper';

export class MedicationRepository
  extends TypeOrmRepository<MedicationEntity>
  implements IMedicationRepository
{
  public async list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    medications: Medication[];
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
      medications: entities.map(MedicationMapper.toDto),
      totalCount,
    };
  }

  public async findByIds(ids: number[]): Promise<Medication[]> {
    const medicationEntities = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return medicationEntities.map((medicationEntity) =>
      MedicationMapper.toDto(medicationEntity),
    );
  }
}
