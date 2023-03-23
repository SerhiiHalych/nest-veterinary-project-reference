import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export interface ListAppointmentsQueryInput {
  search?: string;
  skip: number;
  take: number;
  fromDate?: Date;
  toDate?: Date;
}

export interface ListAppointmentsQueryOutput {
  items: Array<{
    appointmentId: number;
    facilityId: string;
    petSpecies: PetSpecies;
    petName: string;
    appointmentDate: Date;
    appointmentType: string;
    clientId: number;
    clientFirstName: string;
    clientLastName: string;
    doctorId: number;
    doctorFirstName: string;
    doctorLastName: string;
  }>;
  totalCount: number;
}

export interface IListAppointmentsQuery {
  execute(
    inputData: ListAppointmentsQueryInput,
  ): Promise<ListAppointmentsQueryOutput>;
}
