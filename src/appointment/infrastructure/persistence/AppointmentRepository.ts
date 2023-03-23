import * as _ from 'lodash';
import { ClientEntity } from '../../../client/infrastructure/persistence/ClientEntity';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { createHashMap } from '../../../common/utils/createHashMap';
import { replaceWildcardCharacters } from '../../../common/utils/replaceWildcardCharacters';
import { PetSpecies } from '../../../pet/application/enums/PetSpecies';
import { PetEntity } from '../../../pet/infrastructure/persistence/PetEntity';
import { ProcedureEntity } from '../../../treatment/infrastructure/persistence/ProcedureEntity';
import { MedicationEntity } from '../../../warehouse/infrastructure/persistence/MedicationEntity';
import { ReceiptEntity } from '../../../warehouse/infrastructure/persistence/ReceiptEntity';

import { IAppointmentRepository } from '../../application/boundaries/IAppointmentRepository';
import { Appointment } from '../../application/entities/Appointment';
import { AppointmentEntity } from './AppointmentEntity';
import { AppointmentMapper } from './AppointmentMapper';

export class AppointmentRepository
  extends TypeOrmRepository<AppointmentEntity>
  implements IAppointmentRepository
{
  public async list(params?: {
    searchString?: string;
    fromDate?: Date;
    toDate?: Date;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
      appointmentId: number;
      facilityId: string;
      petSpecies: PetSpecies;
      petName: string;
      appointmentDate: Date;
      appointmentType: string;
      clientId: number;
      clientFirstName: string;
      clientLastName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>;
    totalCount: number;
  }> {
    const {
      pagination = {
        skip: 0,
        take: 25,
      },
      searchString,
      fromDate,
      toDate,
    } = params || {};

    const paginatedAppointmentsQB = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .offset(pagination.skip)
      .limit(pagination.take)
      .orderBy({
        DATE: 'DESC',
      });

    if (searchString) {
      const words = replaceWildcardCharacters(searchString).split(' ');

      paginatedAppointmentsQB
        .leftJoin(PetEntity, 'p', 'p.ID_ANIMAL = a.ID_ANIMAL')
        .leftJoin(ClientEntity, 'c', 'c.ID_CLIENT = p.ID_CLIENT');

      words.forEach((word) => {
        paginatedAppointmentsQB.andWhere(
          `
            CONCAT(
              ' ', c.SURNAME,
              ' ', c.NAME,
              ' ', p.BREED,
              ' ', p.NAME
            ) LIKE N'%${word}%'
          `,
        );
      });
    }

    if (fromDate) {
      paginatedAppointmentsQB.andWhere('a.DATE >= :fromDate', { fromDate });
    }

    if (toDate) {
      paginatedAppointmentsQB.andWhere('a.DATE <= :toDate', { toDate });
    }

    const paginatedAppointments: Array<{
      appointmentId: number;
    }> = await paginatedAppointmentsQB.execute();

    if (paginatedAppointments.length === 0) {
      return {
        appointments: [],
        totalCount: 0,
      };
    }

    const totalCount = await paginatedAppointmentsQB.getCount();

    const queryBuilder = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .addSelect('a.ID_OFFICE', 'facilityId')
      .addSelect('p.SPECIES', 'petSpecies')
      .addSelect('p.NAME', 'petName')
      .addSelect('a.DATE', 'appointmentDate')
      .addSelect('rt.NAME', 'appointmentType')
      .addSelect('c.ID_CLIENT', 'clientId')
      .addSelect('c.NAME', 'clientFirstName')
      .addSelect('c.SURNAME', 'clientLastName')
      .addSelect('d.ID_DOCTOR', 'doctorId')
      .addSelect('d.NAME', 'doctorFirstName')
      .addSelect('d.SURNAME', 'doctorLastName')
      .leftJoin(PetEntity, 'p', 'p.ID_ANIMAL = a.ID_ANIMAL')
      .leftJoin(ClientEntity, 'c', 'c.ID_CLIENT = p.ID_CLIENT')
      .leftJoin('Doctor', 'd', 'd.ID_DOCTOR = a.ID_DOCTOR')
      .leftJoin('ReceptionType', 'rt', 'rt.ID_RT = a.ID_RT')
      .where('a.ID_RECEPTION IN (:...paginatedAppointmentsIds)', {
        paginatedAppointmentsIds: paginatedAppointments.map(
          ({ appointmentId }) => appointmentId,
        ),
      });

    const appointments: Array<{
      appointmentId: number;
      facilityId: string;
      petSpecies: string;
      petName: string;
      appointmentDate: Date;
      appointmentType: string;
      clientId: number;
      clientFirstName: string;
      clientLastName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }> = await queryBuilder.execute();

    return {
      appointments: _.orderBy(
        appointments,
        ({ appointmentDate }) => appointmentDate,
        'desc',
      ).map((appointment) => ({
        ...appointment,
        petSpecies:
          appointment.petSpecies === 'Кот' ? PetSpecies.CAT : PetSpecies.DOG,
      })),
      totalCount,
    };
  }

  public async findById(id: number): Promise<Appointment | null> {
    const appointmentEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!appointmentEntity) {
      return null;
    }

    let medicationsWithPrice: Array<{
      medicationId: number;
      amount: number;
      priceIncluded: number;
      price: number;
    }> = [];

    if (appointmentEntity.medications.length) {
      const medicationAdmissions: Array<{
        medicationId: number;
        price: number;
        date: Date;
      }> = await this.dataSource
        .getRepository(ReceiptEntity)
        .createQueryBuilder('r')
        .select('DISTINCT r.ID_MEDICINE', 'medicationId')
        .addSelect('r.PRICE_SELL', 'price')
        .addSelect('r.DATE', 'date')
        .where('r.DATE <= :date', { date: appointmentEntity.date })
        .andWhere('r.ID_OFFICE = :facilityId', {
          facilityId: appointmentEntity.facilityId,
        })
        .andWhere('r.ID_MEDICINE IN (:...medicationIds)', {
          medicationIds: appointmentEntity.medications.map(
            ({ medicationId }) => medicationId,
          ),
        })
        .orderBy('r.DATE', 'DESC')
        .execute();

      const medications: Array<{
        medicationId: number;
        price: number;
      }> = await this.dataSource
        .getRepository(MedicationEntity)
        .createQueryBuilder('m')
        .addSelect('m.ID_MEDICINE', 'medicationId')
        .addSelect('m.CURRENT_PRICE', 'price')
        .where('m.ID_MEDICINE IN (:...medicationIds)', {
          medicationIds: appointmentEntity.medications.map(
            ({ medicationId }) => medicationId,
          ),
        })
        .execute();

      const medicationPriceHashMap = createHashMap(
        medicationAdmissions,
        ({ medicationId }) => medicationId,
      );

      const medicationHashMap = createHashMap(
        medications,
        ({ medicationId }) => medicationId,
      );

      medicationsWithPrice = appointmentEntity.medications.map(
        (medication) => ({
          amount: medication.amount,
          medicationId: medication.medicationId,
          price:
            medicationPriceHashMap.get(medication.medicationId)?.price ??
            medicationHashMap.getTrust(medication.medicationId).price,
          priceIncluded: medication.priceIncluded,
        }),
      );
    }

    let procedures: Array<{
      procedureId: number;
      price: number;
      sale: number;
      amount: number;
    }> = [];

    if (appointmentEntity.procedures.length) {
      const procedureAdmissions: Array<{
        procedureId: number;
        price: number;
      }> = await this.dataSource
        .getRepository(ProcedureEntity)
        .createQueryBuilder('p')
        .select('p.ID_PROCEDURES', 'procedureId')
        .addSelect('p.COST', 'price')
        .where('p.ID_PROCEDURES IN (:...procedureIds)', {
          procedureIds: appointmentEntity.procedures.map(
            ({ procedureId }) => procedureId,
          ),
        })
        .execute();

      const procedureHashMap = createHashMap(
        procedureAdmissions,
        ({ procedureId }) => procedureId,
      );

      procedures = appointmentEntity.procedures.map((procedure) => ({
        amount: procedure.amount,
        procedureId: procedure.procedureId,
        price: procedureHashMap.getTrust(procedure.procedureId).price,
        sale: procedure.sale,
      }));
    }

    return AppointmentMapper.toDto(
      appointmentEntity,
      medicationsWithPrice,
      procedures,
    );
  }

  public async findByClientIdDenormalized(params: {
    clientId: number;
    searchString?: string;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      petId: number;
      petName: string;
      petSpecies: PetSpecies;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>;
    totalCount: number;
  }> {
    const {
      clientId,
      pagination = {
        skip: 0,
        take: 25,
      },
      searchString,
    } = params || {};

    const paginatedAppointmentsQB = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .leftJoin(PetEntity, 'p', 'p.ID_ANIMAL = a.ID_ANIMAL')
      .where('p.ID_CLIENT = :clientId', { clientId })
      .offset(pagination.skip)
      .limit(pagination.take)
      .orderBy({
        DATE: 'DESC',
      });

    if (searchString) {
      const words = replaceWildcardCharacters(searchString).split(' ');

      words.forEach((word) => {
        paginatedAppointmentsQB.andWhere(
          `
            CONCAT(
              ' ', p.BREED,
              ' ', p.NAME
            ) LIKE N'%${word}%'
          `,
        );
      });
    }

    const paginatedAppointments: Array<{
      appointmentId: number;
    }> = await paginatedAppointmentsQB.execute();

    if (paginatedAppointments.length === 0) {
      return {
        appointments: [],
        totalCount: 0,
      };
    }

    const totalCount = await paginatedAppointmentsQB.getCount();

    const queryBuilder = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .addSelect('a.DATE', 'appointmentDate')
      .addSelect('rt.NAME', 'appointmentTypeName')
      .addSelect('p.ID_ANIMAL', 'petId')
      .addSelect('p.NAME', 'petName')
      .addSelect('p.SPECIES', 'petSpecies')
      .addSelect('d.ID_DOCTOR', 'doctorId')
      .addSelect('d.NAME', 'doctorFirstName')
      .addSelect('d.SURNAME', 'doctorLastName')
      .leftJoin(PetEntity, 'p', 'p.ID_ANIMAL = a.ID_ANIMAL')
      .leftJoin('Doctor', 'd', 'd.ID_DOCTOR = a.ID_DOCTOR')
      .leftJoin('ReceptionType', 'rt', 'rt.ID_RT = a.ID_RT')
      .where('a.ID_RECEPTION IN (:...paginatedAppointmentsIds)', {
        paginatedAppointmentsIds: paginatedAppointments.map(
          ({ appointmentId }) => appointmentId,
        ),
      });

    const appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      petId: number;
      petName: string;
      petSpecies: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }> = await queryBuilder.execute();

    return {
      appointments: _.orderBy(
        appointments,
        ({ appointmentDate }) => appointmentDate,
        'desc',
      ).map((appointment) => ({
        ...appointment,
        petSpecies:
          appointment.petSpecies === 'Кот' ? PetSpecies.CAT : PetSpecies.DOG,
      })),
      totalCount,
    };
  }

  public async findByPetIdDenormalized(params: {
    petId: number;
    pagination?: {
      take: number;
      skip: number;
    };
  }): Promise<{
    appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>;
    totalCount: number;
  }> {
    const {
      petId,
      pagination = {
        skip: 0,
        take: 25,
      },
    } = params || {};

    const paginatedAppointmentsQB = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .where('a.ID_ANIMAL = :petId', { petId })
      .offset(pagination.skip)
      .limit(pagination.take)
      .orderBy({
        DATE: 'DESC',
      });

    const paginatedAppointments: Array<{
      appointmentId: number;
    }> = await paginatedAppointmentsQB.execute();

    if (paginatedAppointments.length === 0) {
      return {
        appointments: [],
        totalCount: 0,
      };
    }

    const totalCount = await paginatedAppointmentsQB.getCount();

    const queryBuilder = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .addSelect('a.DATE', 'appointmentDate')
      .addSelect('rt.NAME', 'appointmentTypeName')
      .addSelect('d.ID_DOCTOR', 'doctorId')
      .addSelect('d.NAME', 'doctorFirstName')
      .addSelect('d.SURNAME', 'doctorLastName')
      .leftJoin('Doctor', 'd', 'd.ID_DOCTOR = a.ID_DOCTOR')
      .leftJoin('ReceptionType', 'rt', 'rt.ID_RT = a.ID_RT')
      .where('a.ID_RECEPTION IN (:...paginatedAppointmentsIds)', {
        paginatedAppointmentsIds: paginatedAppointments.map(
          ({ appointmentId }) => appointmentId,
        ),
      });

    const appointments: Array<{
      appointmentId: number;
      appointmentDate: Date;
      appointmentTypeName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }> = await queryBuilder.execute();

    return {
      appointments: _.orderBy(
        appointments,
        ({ appointmentDate }) => appointmentDate,
        'desc',
      ),
      totalCount,
    };
  }

  public async listForScheduler(params?: {
    startDate: Date;
    endDate: Date;
  }): Promise<
    Array<{
      appointmentId: number;
      appointmentTypeName: string;
      appointmentDate: Date;
      petId: number;
      petSpecies: PetSpecies;
      petName: string;
      clientId: number;
      clientFirstName: string;
      clientLastName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }>
  > {
    const { startDate, endDate } = params || {};

    const queryBuilder = this.repository
      .createQueryBuilder('a')
      .select('a.ID_RECEPTION', 'appointmentId')
      .addSelect('rt.NAME', 'appointmentTypeName')
      .addSelect('a.DATE', 'appointmentDate')
      .addSelect('p.ID_ANIMAL', 'petId')
      .addSelect('p.NAME', 'petName')
      .addSelect('p.SPECIES', 'petSpecies')
      .addSelect('c.ID_CLIENT', 'clientId')
      .addSelect('c.NAME', 'clientFirstName')
      .addSelect('c.SURNAME', 'clientLastName')
      .addSelect('d.ID_DOCTOR', 'doctorId')
      .addSelect('d.NAME', 'doctorFirstName')
      .addSelect('d.SURNAME', 'doctorLastName')
      .leftJoin(PetEntity, 'p', 'p.ID_ANIMAL = a.ID_ANIMAL')
      .leftJoin(ClientEntity, 'c', 'c.ID_CLIENT = p.ID_CLIENT')
      .leftJoin('Doctor', 'd', 'd.ID_DOCTOR = a.ID_DOCTOR')
      .leftJoin('ReceptionType', 'rt', 'rt.ID_RT = a.ID_RT')
      .where('a.DATE >= :startDate', { startDate })
      .andWhere('a.DATE <= :endDate', { endDate });

    const appointments: Array<{
      appointmentId: number;
      appointmentTypeName: string;
      appointmentDate: Date;
      petId: number;
      petSpecies: string;
      petName: string;
      clientId: number;
      clientFirstName: string;
      clientLastName: string;
      doctorId: number;
      doctorFirstName: string;
      doctorLastName: string;
    }> = await queryBuilder.execute();

    return appointments.map((appointment) => ({
      ...appointment,
      petSpecies:
        appointment.petSpecies === 'Кот' ? PetSpecies.CAT : PetSpecies.DOG,
    }));
  }
}
