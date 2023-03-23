import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListAppointmentsByClientQuery,
  ListAppointmentsByClientQueryInput,
  ListAppointmentsByClientQueryOutput,
} from './IListAppointmentsByClientQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListAppointmentsByClientQuery
  extends Query<
    ListAppointmentsByClientQueryInput,
    ListAppointmentsByClientQueryOutput
  >
  implements IListAppointmentsByClientQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListAppointmentsByClientQueryInput,
  ): Promise<ListAppointmentsByClientQueryOutput> {
    const { clientId, skip, take, search } = inputData;

    const { appointments, totalCount } =
      await this._dbContext.appointmentRepository.findByClientIdDenormalized({
        clientId,
        pagination: {
          skip,
          take,
        },
        searchString: search,
      });

    return {
      items: appointments.map((appointment) => ({
        appointmentId: appointment.appointmentId,
        appointmentTypeName: appointment.appointmentTypeName,
        appointmentDate: appointment.appointmentDate,
        doctorFirstName: appointment.doctorFirstName,
        doctorId: appointment.doctorId,
        doctorLastName: appointment.doctorLastName,
        petId: appointment.petId,
        petName: appointment.petName,
        petSpecies: appointment.petSpecies,
      })),
      totalCount,
    };
  }
}
