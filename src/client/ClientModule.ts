import { Module } from '@nestjs/common';
import { QueryToken } from '../common/diTokens';
import { GetClientQuery } from './application/queries/getContact/GetClientQuery';
import { ListAppointmentsByClientQuery } from './application/queries/listAppointmentsByClient/ListAppointmentsByClientQuery';
import { ListClientsQuery } from './application/queries/listClients/ListClientsQuery';
import { ListPetsByClientQuery } from './application/queries/listPetsByClient/ListPetsByClientQuery';
import { ClientController } from './infrastructure/api/ClientController';

@Module({
  controllers: [ClientController],
  providers: [
    {
      provide: QueryToken.LIST_CLIENTS,
      useClass: ListClientsQuery,
    },
    {
      provide: QueryToken.GET_CLIENT,
      useClass: GetClientQuery,
    },
    {
      provide: QueryToken.LIST_PETS_BY_CLIENT,
      useClass: ListPetsByClientQuery,
    },
    {
      provide: QueryToken.LIST_APPOINTMENTS_BY_CLIENT,
      useClass: ListAppointmentsByClientQuery,
    },
  ],
})
export class ClientModule {}
