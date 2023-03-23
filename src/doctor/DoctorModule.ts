import { Module } from '@nestjs/common';
import { DoctorController } from './infrastructure/api/DoctorController';

@Module({
  controllers: [DoctorController],
  providers: [],
})
export class DoctorModule {}
