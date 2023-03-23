import { Medication } from '../entities/Medication';

export interface IMedicationRepository {
  list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    medications: Medication[];
    totalCount: number;
  }>;

  findByIds(ids: number[]): Promise<Medication[]>;
}
