import { Facility } from '../entities/Facility';

export interface IFacilityRepository {
  list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    facilities: Facility[];
    totalCount: number;
  }>;

  findById(id: number): Promise<Facility | null>;
}
