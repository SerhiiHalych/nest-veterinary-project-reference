import { Doctor } from '../entities/Doctor';

export interface IDoctorRepository {
  list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    doctors: Doctor[];
    totalCount: number;
  }>;

  findById(id: number): Promise<Doctor | null>;
}
