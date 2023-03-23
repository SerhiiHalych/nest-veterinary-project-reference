import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export interface ListAppointmentsByClientQueryInput {
  clientId: number;
  search?: string;
  skip: number;
  take: number;
}

export interface ListAppointmentsByClientQueryOutput {
  items: Array<{
    appointmentId: number;
    appointmentDate: Date;
    appointmentTypeName: string;
    petId: number;
    petName: string;
    petSpecies: PetSpecies;
    doctorId: number;
    doctorFirstName: string | null;
    doctorLastName: string | null;
  }>;
  totalCount: number;
}

export interface IListAppointmentsByClientQuery {
  execute(
    inputData: ListAppointmentsByClientQueryInput,
  ): Promise<ListAppointmentsByClientQueryOutput>;
}
