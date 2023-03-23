import { Procedure } from '../../application/entities/Procedure';
import { ProcedureEntity } from './ProcedureEntity';

export class ProcedureMapper {
  static toDto(from: ProcedureEntity): Procedure {
    const { id, name, price } = from;

    return new Procedure({
      id,
      name,
      price,
    });
  }

  static toEntity(from: Procedure): ProcedureEntity {
    const { id, name, price } = from;

    return {
      id,
      name,
      price,
    };
  }
}
