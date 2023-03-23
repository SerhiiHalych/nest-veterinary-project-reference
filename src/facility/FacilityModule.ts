import { Module } from '@nestjs/common';
import { FacilityController } from './infrastructure/api/FacilityController';

@Module({
  controllers: [FacilityController],
  providers: [],
})
export class FacilityModule {}
