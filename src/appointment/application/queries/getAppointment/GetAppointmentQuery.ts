import { Inject, Injectable, Scope } from '@nestjs/common';

import {
  GetAppointmentQueryInput,
  GetAppointmentQueryOutput,
  IGetAppointmentQuery,
} from './IGetAppointmentQuery';
import { Query } from '../../../../common/application/Query';
import { IGlobalReadDBContext } from '../../../../common/application/IGlobalReadDBContext';
import { BaseToken } from '../../../../common/diTokens';
import { createHashMap } from '../../../../common/utils/createHashMap';

@Injectable({ scope: Scope.REQUEST })
export class GetAppointmentQuery
  extends Query<GetAppointmentQueryInput, GetAppointmentQueryOutput>
  implements IGetAppointmentQuery
{
  public constructor(
    @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
    protected _dbContext: IGlobalReadDBContext,
  ) {
    super();
  }

  protected async implementation(
    inputData: GetAppointmentQueryInput,
  ): Promise<GetAppointmentQueryOutput> {
    const { id } = inputData;

    const appointment = await this._dbContext.appointmentRepository.findById(
      id,
    );

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const appointmentType =
      await this._dbContext.appointmentTypeRepository.findById(
        appointment.appointmentTypeId,
      );

    if (!appointmentType) {
      throw new Error('Appointment type not found');
    }

    const doctor = appointment.doctorId
      ? await this._dbContext.doctorRepository.findById(appointment.doctorId)
      : null;

    const pet = appointment.petId
      ? await this._dbContext.petRepository.findById(appointment.petId)
      : null;

    const client = pet?.clientId
      ? await this._dbContext.clientRepository.findById(pet.clientId)
      : null;

    const facility = await this._dbContext.facilityRepository.findById(
      appointment.facilityId,
    );

    if (!facility) {
      throw new Error('Facility not found');
    }

    const medications = await this._dbContext.medicationRepository.findByIds(
      appointment.medications.map(({ medicationId }) => medicationId),
    );

    const procedures = await this._dbContext.procedureRepository.findByIds(
      appointment.procedures.map(({ procedureId }) => procedureId),
    );

    const medicationHashMap = createHashMap(medications, ({ id }) => id);
    const procedureHashMap = createHashMap(procedures, ({ id }) => id);

    return {
      id: appointment.id,
      appointmentTypeId: appointmentType.id,
      appointmentTypeName: appointmentType.name,
      appointmentTypePrice: appointmentType.price,
      date: appointment.date,
      diagnosis: appointment.diagnosis,
      doctor: doctor
        ? {
            firstName: doctor.firstName,
            id: doctor.id,
            lastName: doctor.lastName,
          }
        : null,
      medications: appointment.medications.map((appointmentMedication) => {
        const medication = medicationHashMap.getTrust(
          appointmentMedication.medicationId,
        );

        return {
          amount: appointmentMedication.amount,
          id: medication.id,
          name: medication.name,
          unit: medication.unit,
          price: appointmentMedication.price,
          priceIncluded: appointmentMedication.priceIncluded,
        };
      }),
      facility: {
        address: facility.address,
        id: facility.id,
      },
      pet: pet
        ? {
            breed: pet.breed,
            dob: pet.dob,
            gender: pet.gender,
            id: pet.id,
            isBiosterilized: pet.isBiosterilized,
            name: pet.name,
            species: pet.species,
          }
        : null,
      client: client
        ? {
            firstName: client.firstName,
            id: client.id,
            lastName: client.lastName,
            phoneNumber: client.phoneNumber,
          }
        : null,
      procedures: appointment.procedures.map((appointmentProcedure) => {
        const procedure = procedureHashMap.getTrust(
          appointmentProcedure.procedureId,
        );

        return {
          sale: appointmentProcedure.sale,
          id: procedure.id,
          name: procedure.name,
          price: appointmentProcedure.price,
          amount: appointmentProcedure.amount,
        };
      }),
      sale: appointment.sale,
      totalCost: appointment.totalCost,
      treatment: appointment.treatment,
      anamnesis: appointment.anamnesis
        ? {
            description: appointment.anamnesis.description,
            generalState: appointment.anamnesis.generalState,
            temperature: appointment.anamnesis.temperature,
            appetite: appointment.anamnesis.appetite,
            vomiting: appointment.anamnesis.vomiting,
            defecation: appointment.anamnesis.defecation,
            urination: appointment.anamnesis.urination,
            mucous: appointment.anamnesis.mucous,
            skinTurgor: appointment.anamnesis.skinTurgor,
            heartAuscultation: appointment.anamnesis.heartAuscultation,
            lungAuscultation: appointment.anamnesis.lungAuscultation,
            notes: appointment.anamnesis.notes,
          }
        : null,
    };
  }
}
