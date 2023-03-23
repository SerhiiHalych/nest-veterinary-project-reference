import { Procedure } from '../entities/Procedure';

export interface IProcedureRepository {
  findByIds(ids: number[]): Promise<Procedure[]>;
}
