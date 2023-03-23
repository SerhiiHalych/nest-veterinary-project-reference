import { Module } from '@nestjs/common';
import { QueryToken } from '../common/diTokens';
import { GetPetQuery } from './application/queries/getPet/GetPetQuery';
import { ListAppointmentsByPetQuery } from './application/queries/listAppointmentsByPet/ListAppointmentsByPetQuery';
import { ListPetsQuery } from './application/queries/listPets/ListPetsQuery';
import { PetController } from './infrastructure/api/PetController';

@Module({
  controllers: [PetController],
  providers: [
    {
      provide: QueryToken.LIST_PETS,
      useClass: ListPetsQuery,
    },
    {
      provide: QueryToken.GET_PET,
      useClass: GetPetQuery,
    },
    {
      provide: QueryToken.LIST_APPOINTMENTS_BY_PET,
      useClass: ListAppointmentsByPetQuery,
    },
  ],
})
export class PetModule {}
