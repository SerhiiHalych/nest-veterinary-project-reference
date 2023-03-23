import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/infrastructure/configuration/AppConfigModule';
import { ClientModule } from './client/ClientModule';
import { DatabaseModule } from './common/infrastructure/persistence/DatabaseModule';
import { PetModule } from './pet/PetModule';
import { AppointmentModule } from './appointment/AppointmentModule';
import { DashboardModule } from './dashboard/DashboardModule';
import { DoctorModule } from './doctor/DoctorModule';
import { FacilityModule } from './facility/FacilityModule';
import { WarehouseModule } from './warehouse/WarehouseModule';
import { TreatmentModule } from './treatment/TreatmentModule';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    ClientModule,
    PetModule,
    AppointmentModule,
    DashboardModule,
    DoctorModule,
    FacilityModule,
    WarehouseModule,
    TreatmentModule,
  ],
  providers: [],
})
export class AppModule {}
