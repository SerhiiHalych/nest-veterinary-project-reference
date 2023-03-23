export interface GetClientQueryInput {
  id: number;
}

export interface GetClientQueryOutput {
  id: number;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  phoneNumber: string | null;
}

export interface IGetClientQuery {
  execute(inputData: GetClientQueryInput): Promise<GetClientQueryOutput>;
}
