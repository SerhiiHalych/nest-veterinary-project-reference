import { Module } from '@nestjs/common';
import { MedicationController } from './infrastructure/api/MedicationController';

@Module({
  controllers: [MedicationController],
  providers: [],
})
export class WarehouseModule {}
