import { Anamnesis } from './Anamnes';
import { AppointmentMedication } from './AppointmentMedication';
import { AppointmentProcedure } from './AppointmentProcedure';

export class Appointment {
  private _id: number;
  private _facilityId: number;
  private _petId: number;
  private _appointmentTypeId: number;
  private _anamnesis: Anamnesis | null;
  private _doctorId: number;
  private _userId: number;
  private _sickLeave: number;
  private _sickLeaveStatus: number;
  private _diagnosis: string | null;
  private _treatment: string | null;
  private _totalCost: number;
  private _sale: number;
  private _date: Date | null;
  private _medications: AppointmentMedication[];
  private _procedures: AppointmentProcedure[];

  constructor(params: {
    id: number;
    facilityId: number;
    petId: number;
    appointmentTypeId: number;
    doctorId: number;
    userId: number;
    sickLeave: number;
    sickLeaveStatus: number;
    diagnosis: string | null;
    treatment: string | null;
    totalCost: number;
    sale: number;
    date: Date | null;
    anamnesis: Anamnesis | null;
    medications: AppointmentMedication[];
    procedures: AppointmentProcedure[];
  }) {
    const {
      id,
      facilityId,
      petId,
      appointmentTypeId,
      anamnesis,
      doctorId,
      userId,
      sickLeave,
      sickLeaveStatus,
      diagnosis,
      treatment,
      totalCost,
      sale,
      date,
      medications,
      procedures,
    } = params;

    this._id = id;
    this._facilityId = facilityId;
    this._petId = petId;
    this._appointmentTypeId = appointmentTypeId;
    this._anamnesis = anamnesis;
    this._doctorId = doctorId;
    this._userId = userId;
    this._sickLeave = sickLeave;
    this._sickLeaveStatus = sickLeaveStatus;
    this._diagnosis = diagnosis;
    this._treatment = treatment;
    this._totalCost = totalCost;
    this._sale = sale;
    this._date = date;
    this._medications = medications;
    this._procedures = procedures;
  }

  public get id(): number {
    return this._id;
  }

  public get facilityId(): number {
    return this._facilityId;
  }

  public get petId(): number {
    return this._petId;
  }

  public get appointmentTypeId(): number {
    return this._appointmentTypeId;
  }

  public get anamnesis(): Anamnesis | null {
    return this._anamnesis;
  }

  public get doctorId(): number {
    return this._doctorId;
  }

  public get userId(): number {
    return this._userId;
  }

  public get sickLeave(): number {
    return this._sickLeave;
  }

  public get sickLeaveStatus(): number {
    return this._sickLeaveStatus;
  }

  public get diagnosis(): string | null {
    return this._diagnosis;
  }

  public get treatment(): string | null {
    return this._treatment;
  }

  public get totalCost(): number {
    return this._totalCost;
  }

  public get sale(): number {
    return this._sale;
  }

  public get date(): Date | null {
    return this._date;
  }

  public get medications(): AppointmentMedication[] {
    return this._medications;
  }

  public get procedures(): AppointmentProcedure[] {
    return this._procedures;
  }
}
