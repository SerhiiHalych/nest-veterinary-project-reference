import { Module } from '@nestjs/common';
import { QueryToken } from '../common/diTokens';
import { ListEventsQuery } from './application/queries/listEvents/ListEventsQuery';
import { DashboardController } from './infrastructure/api/DashboardController';

@Module({
  controllers: [DashboardController],
  providers: [
    {
      provide: QueryToken.LIST_EVENTS,
      useClass: ListEventsQuery,
    },
  ],
})
export class DashboardModule {}
