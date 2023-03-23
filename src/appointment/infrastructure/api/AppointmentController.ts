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
import { IGetAppointmentQuery } from '../../application/queries/getAppointment/IGetAppointmentQuery';
import { IListAppointmentsQuery } from '../../application/queries/listAppointments/IListAppointmentsQuery';
import {
  GetAppointmentResponse,
  GetAppointmentRequestParams,
  getAppointmentRequestSchema,
} from './interfaces/getAppointment';
import {
  listAppointmentsRequestSchema,
  ListAppointmentsResponse,
  ListAppointmentsRequestQuery,
} from './interfaces/listAppointments';

@ApiTags('Appointment')
@Controller({
  path: 'appointments',
})
export class AppointmentController {
  constructor(
    @Inject(QueryToken.LIST_APPOINTMENTS)
    private listAppointmentsQuery: IListAppointmentsQuery,

    @Inject(QueryToken.GET_APPOINTMENT)
    private getAppointmentQuery: IGetAppointmentQuery,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listAppointmentsRequestSchema))
  @ApiOkResponse({ type: ListAppointmentsResponse })
  @Get()
  async getSortedAppointments(
    @Query() query: ListAppointmentsRequestQuery,
  ): Promise<ListAppointmentsResponse> {
    const result = await this.listAppointmentsQuery.execute({
      skip: query.skip,
      take: query.take,
      search: query.search,
      fromDate: query.fromDate,
      toDate: query.toDate,
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(getAppointmentRequestSchema))
  @ApiOkResponse({ type: GetAppointmentResponse })
  @Get(':id')
  async getAppointment(
    @Param() params: GetAppointmentRequestParams,
  ): Promise<GetAppointmentResponse> {
    const result = await this.getAppointmentQuery.execute({
      id: params.id,
    });

    return result;
  }
}
