import { Module } from '@nestjs/common';
import { QueryToken } from '../common/diTokens';
import { GetAppointmentQuery } from './application/queries/getAppointment/GetAppointmentQuery';
import { ListAppointmentsQuery } from './application/queries/listAppointments/ListAppointmentsQuery';
import { AppointmentController } from './infrastructure/api/AppointmentController';

@Module({
  controllers: [AppointmentController],
  providers: [
    {
      provide: QueryToken.LIST_APPOINTMENTS,
      useClass: ListAppointmentsQuery,
    },
    {
      provide: QueryToken.GET_APPOINTMENT,
      useClass: GetAppointmentQuery,
    },
  ],
})
export class AppointmentModule {}
