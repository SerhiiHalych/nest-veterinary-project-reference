export interface ListAppointmentsByPetQueryInput {
  petId: number;
  skip: number;
  take: number;
}

export interface ListAppointmentsByPetQueryOutput {
  items: Array<{
    appointmentId: number;
    appointmentDate: Date;
    appointmentTypeName: string;
    doctorId: number;
    doctorFirstName: string | null;
    doctorLastName: string | null;
  }>;
  totalCount: number;
}

export interface IListAppointmentsByPetQuery {
  execute(
    inputData: ListAppointmentsByPetQueryInput,
  ): Promise<ListAppointmentsByPetQueryOutput>;
}
