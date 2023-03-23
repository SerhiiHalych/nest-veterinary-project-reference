import { Inject, Injectable, Scope } from '@nestjs/common';
import type {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
} from 'typeorm';
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
import type { IGlobalDBContext } from '../../application/IGlobalDBContext';
import { BaseToken } from '../../diTokens';

@Injectable({ scope: Scope.REQUEST })
export class GlobalDBContext implements IGlobalDBContext {
  private _queryRunner: QueryRunner;

  private _clientRepository: IClientRepository;
  private _petRepository: IPetRepository;
  private _appointmentRepository: IAppointmentRepository;
  private _doctorRepository: IDoctorRepository;
  private _facilityRepository: IFacilityRepository;
  private _appointmentTypeRepository: IAppointmentTypeRepository;
  private _medicationRepository: IMedicationRepository;
  private _procedureRepository: IProcedureRepository;

  constructor(@Inject(BaseToken.DATA_SOURCE) private dataSource: DataSource) {}

  private getRepository<
    TEntity extends EntityTarget<ObjectLiteral>,
    TRepository,
  >(ctor: new (...args: any[]) => TRepository, entity: TEntity): TRepository {
    return new ctor(
      this._queryRunner.manager.getRepository(entity),
      this.dataSource,
    );
  }

  private initRepositories(): void {
    this._queryRunner = this.dataSource.createQueryRunner();

    this._clientRepository = this.getRepository(ClientRepository, ClientEntity);
    this._petRepository = this.getRepository(PetRepository, PetEntity);
    this._doctorRepository = this.getRepository(DoctorRepository, DoctorEntity);
    this._appointmentRepository = this.getRepository(
      AppointmentRepository,
      AppointmentEntity,
    );
    this._facilityRepository = this.getRepository(
      FacilityRepository,
      FacilityEntity,
    );
    this._appointmentTypeRepository = this.getRepository(
      AppointmentTypeRepository,
      AppointmentTypeEntity,
    );
    this._medicationRepository = this.getRepository(
      MedicationRepository,
      MedicationEntity,
    );
    this._procedureRepository = this.getRepository(
      ProcedureRepository,
      ProcedureEntity,
    );
  }

  get clientRepository(): IClientRepository {
    return this._clientRepository;
  }

  get petRepository(): IPetRepository {
    return this._petRepository;
  }

  get appointmentRepository(): IAppointmentRepository {
    return this._appointmentRepository;
  }

  get doctorRepository(): IDoctorRepository {
    return this._doctorRepository;
  }

  get facilityRepository(): IFacilityRepository {
    return this._facilityRepository;
  }

  get appointmentTypeRepository(): IAppointmentTypeRepository {
    return this._appointmentTypeRepository;
  }

  get medicationRepository(): IMedicationRepository {
    return this._medicationRepository;
  }

  get procedureRepository(): IProcedureRepository {
    return this._procedureRepository;
  }

  startTransaction(): Promise<void> {
    this.initRepositories();

    return this._queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this._queryRunner.commitTransaction();

    await this._queryRunner.release();
  }

  async rollbackTransaction(): Promise<void> {
    await this._queryRunner.rollbackTransaction();

    await this._queryRunner.release();
  }

  async releaseConnection(): Promise<void> {
    await this._queryRunner.release();
  }
}
