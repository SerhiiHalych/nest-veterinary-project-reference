import { IAppointmentRepository } from '../../appointment/application/boundaries/IAppointmentRepository';
import { IAppointmentTypeRepository } from '../../appointment/application/boundaries/IAppointmentTypeRepository';
import { IClientRepository } from '../../client/application/boundaries/IClientRepository';
import { IDoctorRepository } from '../../doctor/application/boundaries/IDoctorRepository';
import { IFacilityRepository } from '../../facility/application/boundaries/IFacilityRepository';
import { IPetRepository } from '../../pet/application/boundaries/IPetRepository';
import { IProcedureRepository } from '../../treatment/application/boundaries/IProcedureRepository';
import { IMedicationRepository } from '../../warehouse/application/boundaries/IMedicationRepository';
import type { IDBContext } from './IDBContext';

export interface IGlobalDBContext extends IDBContext {
  clientRepository: IClientRepository;
  petRepository: IPetRepository;
  appointmentRepository: IAppointmentRepository;
  doctorRepository: IDoctorRepository;
  facilityRepository: IFacilityRepository;
  appointmentTypeRepository: IAppointmentTypeRepository;
  medicationRepository: IMedicationRepository;
  procedureRepository: IProcedureRepository;
}
