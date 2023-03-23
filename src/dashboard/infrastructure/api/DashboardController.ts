import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryToken } from '../../../common/diTokens';
import { JwtAuthGuard } from '../../../common/infrastructure/guards/jwt-auth.guard';
import { validateRequest } from '../../../common/infrastructure/validation/joi/validateRequest';
import { IListEventsQuery } from '../../application/queries/listEvents/IListEventsQuery';
import {
  listEventsRequestSchema,
  ListEventsResponse,
  ListEventsRequestQuery,
} from './interfaces/listEvents';

@ApiTags('Dashboard')
@Controller({
  path: 'dashboard',
})
export class DashboardController {
  constructor(
    @Inject(QueryToken.LIST_EVENTS)
    private listEventsQuery: IListEventsQuery,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(validateRequest(listEventsRequestSchema))
  @ApiOkResponse({ type: ListEventsResponse })
  @Get('events')
  async getSortedEvents(
    @Query() query: ListEventsRequestQuery,
  ): Promise<ListEventsResponse> {
    const result = await this.listEventsQuery.execute({
      endDate: query.endDate,
      startDate: query.startDate,
    });

    return result;
  }
}
