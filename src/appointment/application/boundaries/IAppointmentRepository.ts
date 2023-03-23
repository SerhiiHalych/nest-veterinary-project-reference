import { PetSpecies } from '../../../pet/application/enums/PetSpecies';
import { Appointment } from '../entities/Appointment';

export interface IAppointmentRepository {
  list(params?: {
    searchString?: string;
    fromDate?: Date;
    toDate?: Date;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
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
  }>;

  listForScheduler(params?: { startDate: Date; endDate: Date }): Promise<
    Array<{
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
    }>
  >;

  findById(id: number): Promise<Appointment | null>;

  findByClientIdDenormalized(params: {
    clientId: number;
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      petId: number;
      petName: string;
      petSpecies: PetSpecies;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>;
    totalCount: number;
  }>;

  findByPetIdDenormalized(params: {
    petId: number;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>;
    totalCount: number;
  }>;
}
