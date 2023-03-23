import { In } from 'typeorm';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';

import { IProcedureRepository } from '../../application/boundaries/IProcedureRepository';
import { Procedure } from '../../application/entities/Procedure';
import { ProcedureEntity } from './ProcedureEntity';
import { ProcedureMapper } from './ProcedureMapper';

export class ProcedureRepository
  extends TypeOrmRepository<ProcedureEntity>
  implements IProcedureRepository
{
  public async findByIds(ids: number[]): Promise<Procedure[]> {
    const treatmentEntities = await this.repository.find({
      where: {
        id: In(ids),
      },
    });

    return treatmentEntities.map((treatmentEntity) =>
      ProcedureMapper.toDto(treatmentEntity),
    );
  }
}
