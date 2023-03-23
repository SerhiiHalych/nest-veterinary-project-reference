export interface ListClientsQueryInput {
  search?: string;
  skip: number;
  take: number;
}

export interface ListClientsQueryOutput {
  items: Array<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    address: string | null;
    phoneNumber: string | null;
  }>;
  totalCount: number;
}

export interface IListClientsQuery {
  execute(inputData: ListClientsQueryInput): Promise<ListClientsQueryOutput>;
}
