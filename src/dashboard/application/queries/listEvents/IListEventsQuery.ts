import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export interface ListEventsQueryInput {
  startDate: Date;
  endDate: Date;
}

export interface ListEventsQueryOutput {
  items: Array<{
    appointmentId: number;
    appointmentTypeName: string;
    appointmentDate: Date;
    petId: number;
    petSpecies: PetSpecies;
    petName: string;
    clientId: number;
    clientFirstName: string;
    clientLastName: string;
    doctorId: number;
    doctorFirstName: string;
    doctorLastName: string;
  }>;
}

export interface IListEventsQuery {
  execute(inputData: ListEventsQueryInput): Promise<ListEventsQueryOutput>;
}
