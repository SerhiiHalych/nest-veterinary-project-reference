import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListAppointmentsByPetQuery,
  ListAppointmentsByPetQueryInput,
  ListAppointmentsByPetQueryOutput,
} from './IListAppointmentsByPetQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';

@Injectable({ scope: Scope.REQUEST })
export class ListAppointmentsByPetQuery
  extends Query<
    ListAppointmentsByPetQueryInput,
    ListAppointmentsByPetQueryOutput
  >
  implements IListAppointmentsByPetQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListAppointmentsByPetQueryInput,
  ): Promise<ListAppointmentsByPetQueryOutput> {
    const { petId, skip, take } = inputData;

    const { appointments, totalCount } =
      await this._dbContext.appointmentRepository.findByPetIdDenormalized({
        petId,
        pagination: {
          skip,
          take,
        },
      });

    return {
      items: appointments.map((appointment) => ({
        appointmentId: appointment.appointmentId,
        appointmentTypeName: appointment.appointmentTypeName,
        appointmentDate: appointment.appointmentDate,
        doctorFirstName: appointment.doctorFirstName,
        doctorId: appointment.doctorId,
        doctorLastName: appointment.doctorLastName,
      })),
      totalCount,
    };
  }
}
