import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  IListAppointmentsQuery,
  ListAppointmentsQueryInput,
  ListAppointmentsQueryOutput,
} from './IListAppointmentsQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';
import * as moment from 'moment';

@Injectable({ scope: Scope.REQUEST })
export class ListAppointmentsQuery
  extends Query<ListAppointmentsQueryInput, ListAppointmentsQueryOutput>
  implements IListAppointmentsQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: ListAppointmentsQueryInput,
  ): Promise<ListAppointmentsQueryOutput> {
    const { skip, take, search, fromDate, toDate } = inputData;

    const { appointments, totalCount } =
      await this._dbContext.appointmentRepository.list({
        pagination: {
          skip,
          take,
        },
        searchString: search,
        fromDate,
        toDate,
      });

    const eventsPerDay: Record<string, number> = {};
    const startHour = 9;
    const step = 0.5;

    return {
      totalCount,
      items: appointments.map((appointment) => {
        const eventDate = `${moment(appointment.appointmentDate).format(
          'DDMMYYYY',
        )}`;

        if (eventsPerDay[eventDate] === undefined) {
          eventsPerDay[eventDate] = 0;
        } else {
          eventsPerDay[eventDate] += 1;
        }

        const eventPerDayCounter = eventsPerDay[eventDate];

        const eventTime = startHour + eventPerDayCounter * step;

        const hours = Math.floor(eventTime);
        const minutes = (eventTime % 1) * 60;

        const eventStartTime = moment(appointment.appointmentDate)
          .set('hours', hours)
          .set('minutes', minutes);

        return {
          appointmentId: appointment.appointmentId,
          facilityId: appointment.facilityId,
          petSpecies: appointment.petSpecies,
          petName: appointment.petName,
          appointmentDate: eventStartTime.toDate(),
          appointmentType: appointment.appointmentType,
          clientId: appointment.clientId,
          clientFirstName: appointment.clientFirstName,
          clientLastName: appointment.clientLastName,
          doctorId: appointment.doctorId,
          doctorFirstName: appointment.doctorFirstName,
          doctorLastName: appointment.doctorLastName,
        };
      }),
    };
  }
}
