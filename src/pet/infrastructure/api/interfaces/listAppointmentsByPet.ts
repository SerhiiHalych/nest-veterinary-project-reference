import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';

export class ListAppointmentsByPetRequestParams {
  @ApiProperty()
  petId: number;
}

export class ListAppointmentsByPetRequestQuery {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  search?: string;
}

export const listAppointmentsByPetRequestSchema = createRequestSchema({
  params: createObjectSchema<ListAppointmentsByPetRequestParams>({
    petId: extendedJoi.number(),
  }),
  query: createObjectSchema<ListAppointmentsByPetRequestQuery>({
    skip: extendedJoi.number(),
    take: extendedJoi.number(),
    search: extendedJoi.string().optional(),
  }),
});

class ListAppointmentsByPetResponseItem {
  @ApiProperty()
  appointmentId: number;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  appointmentTypeName: string;

  @ApiProperty()
  doctorId: number | null;

  @ApiProperty()
  doctorFirstName: string | null;

  @ApiProperty()
  doctorLastName: string | null;
}

export class ListAppointmentsByPetResponse {
  @ApiProperty({ type: [ListAppointmentsByPetResponseItem] })
  items: Array<ListAppointmentsByPetResponseItem>;

  @ApiProperty()
  totalCount: number;
}
