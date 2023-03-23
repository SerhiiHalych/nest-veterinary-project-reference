import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';

import { IDoctorRepository } from '../../application/boundaries/IDoctorRepository';
import { Doctor } from '../../application/entities/Doctor';
import { DoctorEntity } from './DoctorEntity';
import { DoctorMapper } from './DoctorMapper';

export class DoctorRepository
  extends TypeOrmRepository<DoctorEntity>
  implements IDoctorRepository
{
  public async list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    doctors: Doctor[];
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
      doctors: entities.map(DoctorMapper.toDto),
      totalCount,
    };
  }

  public async findById(id: number): Promise<Doctor | null> {
    const doctorEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!doctorEntity) {
      return null;
    }

    return DoctorMapper.toDto(doctorEntity);
  }
}
