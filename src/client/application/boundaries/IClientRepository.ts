import { Client } from '../entities/Client';

export interface IClientRepository {
  list(params?: {
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    clients: Client[];
    totalCount: number;
  }>;

  findById(id: number): Promise<Client | null>;
}
