import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryToken } from '../../../common/diTokens';
import { JwtAuthGuard } from '../../../common/infrastructure/guards/jwt-auth.guard';
import { validateRequest } from '../../../common/infrastructure/validation/joi/validateRequest';
import { IGetPetQuery } from '../../application/queries/getPet/IGetPetQuery';
import { IListAppointmentsByPetQuery } from '../../application/queries/listAppointmentsByPet/IListAppointmentsByPetQuery';
import { IListPetsQuery } from '../../application/queries/listPets/IListPetsQuery';
import {
  GetPetResponse,
  GetPetRequestParams,
  getPetRequestSchema,
} from './interfaces/getPet';
import {
  listAppointmentsByPetRequestSchema,
  ListAppointmentsByPetResponse,
  ListAppointmentsByPetRequestParams,
  ListAppointmentsByPetRequestQuery,
} from './interfaces/listAppointmentsByPet';
import {
  listPetsRequestSchema,
  ListPetsResponse,
  ListPetsRequestQuery,
} from './interfaces/listPets';

@ApiTags('Pet')
@Controller({
  path: 'pets',
})
export class PetController {
  constructor(
    @Inject(QueryToken.LIST_PETS)
    private listPetsQuery: IListPetsQuery,

    @Inject(QueryToken.GET_PET)
    private getPetQuery: IGetPetQuery,

    @Inject(QueryToken.LIST_APPOINTMENTS_BY_PET)
    private listAppointmentsByPetQuery: IListAppointmentsByPetQuery,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listPetsRequestSchema))
  @ApiOkResponse({ type: ListPetsResponse })
  @Get()
  async getSortedPets(
    @Query() query: ListPetsRequestQuery,
  ): Promise<ListPetsResponse> {
    const result = await this.listPetsQuery.execute({
      skip: query.skip,
      take: query.take,
      search: query.search,
      withoutOwner: query.withoutOwner ?? false,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(getPetRequestSchema))
  @ApiOkResponse({ type: GetPetResponse })
  @Get(':id')
  async getPet(@Param() params: GetPetRequestParams): Promise<GetPetResponse> {
    const result = await this.getPetQuery.execute({
      id: params.id,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listAppointmentsByPetRequestSchema))
  @ApiOkResponse({ type: ListAppointmentsByPetResponse })
  @Get(':petId/appointments')
  async getAppointmentsByPet(
    @Param() params: ListAppointmentsByPetRequestParams,
    @Query() query: ListAppointmentsByPetRequestQuery,
  ): Promise<ListAppointmentsByPetResponse> {
    const result = await this.listAppointmentsByPetQuery.execute({
      petId: params.petId,
      skip: query.skip,
      take: query.take,
    });

    return result;
  }
}
