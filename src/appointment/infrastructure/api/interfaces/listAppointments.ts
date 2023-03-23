import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export class ListAppointmentsRequestQuery {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  fromDate?: Date;

  @ApiPropertyOptional()
  toDate?: Date;
}

export const listAppointmentsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListAppointmentsRequestQuery>({
    skip: extendedJoi.number(),
    take: extendedJoi.number(),
    search: extendedJoi.string().optional(),
    fromDate: extendedJoi
      .date()
      .when('toDate', {
        not: extendedJoi.exist(),
        then: extendedJoi.date().optional(),
        otherwise: extendedJoi.date().max(extendedJoi.ref('toDate')),
      })
      .optional(),
    toDate: extendedJoi.date().optional(),
  }),
});

class ListAppointmentsResponseItem {
  @ApiProperty()
  appointmentId: number;

  @ApiProperty()
  facilityId: string;

  @ApiProperty()
  petSpecies: PetSpecies;

  @ApiProperty()
  petName: string;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  appointmentType: string;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  clientFirstName: string;

  @ApiProperty()
  clientLastName: string;

  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  doctorFirstName: string;

  @ApiProperty()
  doctorLastName: string;
}

export class ListAppointmentsResponse {
  @ApiProperty({ type: [ListAppointmentsResponseItem] })
  items: Array<ListAppointmentsResponseItem>;

  @ApiProperty()
  totalCount: number;
}
