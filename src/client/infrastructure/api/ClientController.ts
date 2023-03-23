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
import { IGetClientQuery } from '../../application/queries/getContact/IGetClientQuery';
import { IListAppointmentsByClientQuery } from '../../application/queries/listAppointmentsByClient/IListAppointmentsByClientQuery';
import { IListClientsQuery } from '../../application/queries/listClients/IListClientsQuery';
import { IListPetsByClientQuery } from '../../application/queries/listPetsByClient/IListPetsByClientQuery';
import {
  GetClientResponse,
  GetClientRequestParams,
  getClientRequestSchema,
} from './interfaces/getClient';
import {
  listAppointmentsByClientRequestSchema,
  ListAppointmentsByClientResponse,
  ListAppointmentsByClientRequestParams,
  ListAppointmentsByClientRequestQuery,
} from './interfaces/listAppointmentsByClient';
import {
  listClientsRequestSchema,
  ListClientsResponse,
  ListClientsRequestQuery,
} from './interfaces/listClients';
import {
  listPetsByClientRequestSchema,
  ListPetsByClientResponse,
  ListPetsByClientRequestParams,
  ListPetsByClientRequestQuery,
} from './interfaces/listPetsByClient';

@ApiTags('Client')
@Controller({
  path: 'clients',
})
export class ClientController {
  constructor(
    @Inject(QueryToken.LIST_CLIENTS)
    private listClientsQuery: IListClientsQuery,

    @Inject(QueryToken.GET_CLIENT)
    private getClientQuery: IGetClientQuery,

    @Inject(QueryToken.LIST_PETS_BY_CLIENT)
    private listPetsByClientQuery: IListPetsByClientQuery,

    @Inject(QueryToken.LIST_APPOINTMENTS_BY_CLIENT)
    private listAppointmentsByClientQuery: IListAppointmentsByClientQuery,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listClientsRequestSchema))
  @ApiOkResponse({ type: ListClientsResponse })
  @Get()
  async getSortedClients(
    @Query() query: ListClientsRequestQuery,
  ): Promise<ListClientsResponse> {
    const result = await this.listClientsQuery.execute({
      skip: query.skip,
      take: query.take,
      search: query.search,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(getClientRequestSchema))
  @ApiOkResponse({ type: GetClientResponse })
  @Get(':id')
  async getClient(
    @Param() params: GetClientRequestParams,
  ): Promise<GetClientResponse> {
    const result = await this.getClientQuery.execute({
      id: params.id,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listPetsByClientRequestSchema))
  @ApiOkResponse({ type: ListPetsByClientResponse })
  @Get(':clientId/pets')
  async getPetsByClient(
    @Param() params: ListPetsByClientRequestParams,
    @Query() query: ListPetsByClientRequestQuery,
  ): Promise<ListPetsByClientResponse> {
    const result = await this.listPetsByClientQuery.execute({
      clientId: params.clientId,
      search: query.search,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listAppointmentsByClientRequestSchema))
  @ApiOkResponse({ type: ListAppointmentsByClientResponse })
  @Get(':clientId/appointments')
  async getAppointmentsByClient(
    @Param() params: ListAppointmentsByClientRequestParams,
    @Query() query: ListAppointmentsByClientRequestQuery,
  ): Promise<ListAppointmentsByClientResponse> {
    const result = await this.listAppointmentsByClientQuery.execute({
      clientId: params.clientId,
      skip: query.skip,
      take: query.take,
      search: query.search,
    });

    return result;
  }
}
