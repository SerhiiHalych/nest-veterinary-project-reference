import { Module } from '@nestjs/common';
import { ProcedureController } from './infrastructure/api/ProcedureController';

@Module({
  controllers: [ProcedureController],
  providers: [],
})
export class TreatmentModule {}
