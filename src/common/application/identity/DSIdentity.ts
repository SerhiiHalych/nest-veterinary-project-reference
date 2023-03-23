export enum IdentityType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export interface DSIdentity {
  id: string;
  type: IdentityType;
}
