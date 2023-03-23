import { invertObject } from '../../../common/utils/invertObject';
import { Appointment } from '../../application/entities/Appointment';
import { Appetite } from '../../application/enums/Appetite';
import { Defecation } from '../../application/enums/Defecation';
import { GeneralState } from '../../application/enums/GeneralState';
import { HeartAuscultation } from '../../application/enums/HeartAuscultation';
import { LungAuscultation } from '../../application/enums/LungAuscultation';
import { Mucous } from '../../application/enums/Mucous';
import { SkinTurgor } from '../../application/enums/SkinTurgor';
import { Urination } from '../../application/enums/Urination';
import { Vomiting } from '../../application/enums/Vomiting';
import { AppointmentEntity } from './AppointmentEntity';
import { SaveableAppointmentEntity } from './SaveableAppointmentEntity';

const appetiteMap: Record<number, Appetite> = {
  0: Appetite.NORMAL,
  1: Appetite.NO_APPETITE,
  2: Appetite.BAD,
};

const defecationMap: Record<number, Defecation> = {
  0: Defecation.NORMAL,
  1: Defecation.DIARRHEA,
  2: Defecation.CONSTIPATION,
};

const generalStateMap: Record<number, GeneralState> = {
  0: GeneralState.NORMAL,
  1: GeneralState.SATISFYING,
  2: GeneralState.SLUGGISH,
  3: GeneralState.MODERATE_SEVERITY,
  4: GeneralState.SERIOUS_СONDITION,
  5: GeneralState.EXTREMELY_SERIOUS_СONDITION,
  6: GeneralState.AGONY,
};

const heartAuscultationMap: Record<number, HeartAuscultation> = {
  0: HeartAuscultation.NORMAL,
  1: HeartAuscultation.TACHYCARDIA,
  2: HeartAuscultation.BRADYCARDIA,
  3: HeartAuscultation.ARRHYTHMIA,
};

const lungAuscultationMap: Record<number, LungAuscultation> = {
  0: LungAuscultation.NORMAL,
  1: LungAuscultation.TACHYPNEA,
  2: LungAuscultation.BRADYPNEA,
};

const mucousMap: Record<number, Mucous> = {
  0: Mucous.NORMAL,
  1: Mucous.PALE,
  2: Mucous.ICTERIC,
  3: Mucous.HYPEREMIC,
  4: Mucous.BLUISH,
};

const skinTurgorMap: Record<number, SkinTurgor> = {
  0: SkinTurgor.NORMAL,
  1: SkinTurgor.REDUCED,
};

const urinationMap: Record<number, Urination> = {
  0: Urination.NORMAL,
  1: Urination.DIFFICULTY,
  2: Urination.OLIGURIA,
  3: Urination.ANURIA,
  4: Urination.POLYURIA,
};

const vomitingMap: Record<number, Vomiting> = {
  0: Vomiting.NO,
  1: Vomiting.YES,
};

const reversedAppetiteMap = invertObject(appetiteMap);
const reversedDefecationMap = invertObject(defecationMap);
const reversedGeneralStateMap = invertObject(generalStateMap);
const reversedHeartAuscultationMap = invertObject(heartAuscultationMap);
const reversedLungAuscultationMap = invertObject(lungAuscultationMap);
const reversedMucousMap = invertObject(mucousMap);
const reversedSkinTurgorMap = invertObject(skinTurgorMap);
const reversedUrinationMap = invertObject(urinationMap);
const reversedVomitingMap = invertObject(vomitingMap);

export class AppointmentMapper {
  static toDto(
    from: AppointmentEntity,
    medications: Array<{
      medicationId: number;
      amount: number;
      priceIncluded: number;
      price: number;
    }>,
    procedures: Array<{
      procedureId: number;
      price: number;
      sale: number;
      amount: number;
    }>,
  ): Appointment {
    const {
      anamnesis,
      petId,
      date,
      diagnosis,
      doctorId,
      id,
      facilityId,
      appointmentTypeId,
      sale,
      sickLeave,
      sickLeaveStatus,
      totalCost,
      treatment,
      userId,
    } = from;

    return new Appointment({
      anamnesis: anamnesis
        ? {
            appetite: appetiteMap[anamnesis.appetite],
            defecation: defecationMap[anamnesis.defecation],
            generalState: generalStateMap[anamnesis.generalState],
            heartAuscultation:
              heartAuscultationMap[anamnesis.heartAuscultation],
            lungAuscultation: lungAuscultationMap[anamnesis.lungAuscultation],
            mucous: mucousMap[anamnesis.mucous],
            skinTurgor: skinTurgorMap[anamnesis.skinTurgor],
            urination: urinationMap[anamnesis.urination],
            vomiting: vomitingMap[anamnesis.vomiting],
            description: anamnesis.description,
            notes: anamnesis.notes,
            temperature: anamnesis.temperature,
          }
        : null,
      petId,
      date,
      diagnosis,
      doctorId,
      id,
      facilityId,
      appointmentTypeId,
      sale,
      sickLeave,
      sickLeaveStatus,
      totalCost,
      treatment,
      userId,
      medications: medications.map((medication) => ({
        amount: medication.amount,
        medicationId: medication.medicationId,
        priceIncluded: medication.priceIncluded === 1,
        price: medication.price,
      })),
      procedures: procedures.map((procedure) => ({
        procedureId: procedure.procedureId,
        price: procedure.price,
        sale: procedure.sale,
        amount: procedure.amount,
      })),
    });
  }

  static toEntity(from: Appointment): SaveableAppointmentEntity {
    const {
      anamnesis,
      petId,
      date,
      diagnosis,
      doctorId,
      id,
      facilityId,
      appointmentTypeId,
      sale,
      sickLeave,
      sickLeaveStatus,
      totalCost,
      treatment,
      userId,
      medications,
      procedures,
    } = from;

    return {
      anamnesis: anamnesis
        ? {
            appetite: reversedAppetiteMap[anamnesis.appetite],
            defecation: reversedDefecationMap[anamnesis.defecation],
            generalState: reversedGeneralStateMap[anamnesis.generalState],
            heartAuscultation:
              reversedHeartAuscultationMap[anamnesis.heartAuscultation],
            lungAuscultation:
              reversedLungAuscultationMap[anamnesis.lungAuscultation],
            mucous: reversedMucousMap[anamnesis.mucous],
            skinTurgor: reversedSkinTurgorMap[anamnesis.skinTurgor],
            urination: reversedUrinationMap[anamnesis.urination],
            vomiting: reversedVomitingMap[anamnesis.vomiting],
            notes: anamnesis.notes,
            temperature: anamnesis.temperature,
            description: anamnesis.description,
          }
        : null,
      petId,
      date,
      diagnosis,
      doctorId,
      id,
      facilityId,
      appointmentTypeId,
      sale,
      sickLeave,
      sickLeaveStatus,
      totalCost,
      treatment,
      userId,
      medications: medications.map((medication) => ({
        amount: medication.amount,
        medicationId: medication.medicationId,
        priceIncluded: medication.priceIncluded ? 1 : 0,
      })),
      procedures: procedures.map((procedure) => ({
        sale: procedure.sale,
        procedureId: procedure.procedureId,
        amount: procedure.amount,
      })),
    };
  }
}
