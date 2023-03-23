import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListEventsQuery,
  ListEventsQueryInput,
  ListEventsQueryOutput,
} from './IListEventsQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListEventsQuery
  extends Query<ListEventsQueryInput, ListEventsQueryOutput>
  implements IListEventsQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListEventsQueryInput,
  ): Promise<ListEventsQueryOutput> {
    const { endDate, startDate } = inputData;

    const appointments =
      await this._dbContext.appointmentRepository.listForScheduler({
        endDate,
        startDate,
      });

    return {
      items: appointments.map((appointment) => ({
        appointmentId: appointment.appointmentId,
        petId: appointment.petId,
        petName: appointment.petName,
        petSpecies: appointment.petSpecies,
        appointmentDate: appointment.appointmentDate,
        appointmentTypeName: appointment.appointmentTypeName,
        clientId: appointment.clientId,
        clientFirstName: appointment.clientFirstName,
        clientLastName: appointment.clientLastName,
        doctorId: appointment.doctorId,
        doctorFirstName: appointment.doctorFirstName,
        doctorLastName: appointment.doctorLastName,
      })),
    };
  }
}
