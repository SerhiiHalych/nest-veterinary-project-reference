import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { IAppointmentRepository } from '../../../appointment/application/boundaries/IAppointmentRepository';
import { IAppointmentTypeRepository } from '../../../appointment/application/boundaries/IAppointmentTypeRepository';
import { AppointmentEntity } from '../../../appointment/infrastructure/persistence/AppointmentEntity';
import { AppointmentRepository } from '../../../appointment/infrastructure/persistence/AppointmentRepository';
import { AppointmentTypeEntity } from '../../../appointment/infrastructure/persistence/AppointmentTypeEntity';
import { AppointmentTypeRepository } from '../../../appointment/infrastructure/persistence/AppointmentTypeRepository';
import { IClientRepository } from '../../../client/application/boundaries/IClientRepository';
import { ClientEntity } from '../../../client/infrastructure/persistence/ClientEntity';
import { ClientRepository } from '../../../client/infrastructure/persistence/ClientRepository';
import { IDoctorRepository } from '../../../doctor/application/boundaries/IDoctorRepository';
import { DoctorEntity } from '../../../doctor/infrastructure/persistence/DoctorEntity';
import { DoctorRepository } from '../../../doctor/infrastructure/persistence/DoctorRepository';
import { IFacilityRepository } from '../../../facility/application/boundaries/IFacilityRepository';
import { FacilityEntity } from '../../../facility/infrastructure/persistence/FacilityEntity';
import { FacilityRepository } from '../../../facility/infrastructure/persistence/FacilityRepository';
import { IPetRepository } from '../../../pet/application/boundaries/IPetRepository';
import { PetEntity } from '../../../pet/infrastructure/persistence/PetEntity';
import { PetRepository } from '../../../pet/infrastructure/persistence/PetRepository';
import { IProcedureRepository } from '../../../treatment/application/boundaries/IProcedureRepository';
import { ProcedureEntity } from '../../../treatment/infrastructure/persistence/ProcedureEntity';
import { ProcedureRepository } from '../../../treatment/infrastructure/persistence/ProcedureRepository';
import { IMedicationRepository } from '../../../warehouse/application/boundaries/IMedicationRepository';
import { MedicationEntity } from '../../../warehouse/infrastructure/persistence/MedicationEntity';
import { MedicationRepository } from '../../../warehouse/infrastructure/persistence/MedicationRepository';

import type { IGlobalReadDBContext } from '../../application/IGlobalReadDBContext';
import { BaseToken } from '../../diTokens';

@Injectable()
export class GlobalReadDBContext implements IGlobalReadDBContext {
  private readonly instantiatedRepositories: Map<
    { new (...args: any[]): any },
    any
  > = new Map();

  constructor(@Inject(BaseToken.DATA_SOURCE) private dataSource: DataSource) {}

  private getRepository<
    TEntity extends EntityTarget<ObjectLiteral>,
    TRepository,
  >(ctor: new (...args: any[]) => TRepository, entity: TEntity): TRepository {
    let instantiatedRepository = this.instantiatedRepositories.get(ctor);

    if (!instantiatedRepository) {
      instantiatedRepository = new ctor(
        this.dataSource.getRepository(entity),
        this.dataSource,
      );

      this.instantiatedRepositories.set(ctor, instantiatedRepository);
    }

    return instantiatedRepository as TRepository;
  }

  get clientRepository(): IClientRepository {
    return this.getRepository(ClientRepository, ClientEntity);
  }

  get petRepository(): IPetRepository {
    return this.getRepository(PetRepository, PetEntity);
  }

  get appointmentRepository(): IAppointmentRepository {
    return this.getRepository(AppointmentRepository, AppointmentEntity);
  }

  get doctorRepository(): IDoctorRepository {
    return this.getRepository(DoctorRepository, DoctorEntity);
  }

  get facilityRepository(): IFacilityRepository {
    return this.getRepository(FacilityRepository, FacilityEntity);
  }

  get appointmentTypeRepository(): IAppointmentTypeRepository {
    return this.getRepository(AppointmentTypeRepository, AppointmentTypeEntity);
  }

  get medicationRepository(): IMedicationRepository {
    return this.getRepository(MedicationRepository, MedicationEntity);
  }

  get procedureRepository(): IProcedureRepository {
    return this.getRepository(ProcedureRepository, ProcedureEntity);
  }
}
