import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';

export class ListAppointmentsByClientRequestParams {
  @ApiProperty()
  clientId: number;
}

export class ListAppointmentsByClientRequestQuery {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  search?: string;
}

export const listAppointmentsByClientRequestSchema = createRequestSchema({
  params: createObjectSchema<ListAppointmentsByClientRequestParams>({
    clientId: extendedJoi.number(),
  }),
  query: createObjectSchema<ListAppointmentsByClientRequestQuery>({
    skip: extendedJoi.number(),
    take: extendedJoi.number(),
    search: extendedJoi.string().optional(),
  }),
});

class ListAppointmentsByClientResponseItem {
  @ApiProperty()
  appointmentId: number;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  appointmentTypeName: string;

  @ApiProperty()
  petId: number;

  @ApiProperty()
  petName: string;

  @ApiProperty()
  doctorId: number | null;

  @ApiProperty()
  doctorFirstName: string | null;

  @ApiProperty()
  doctorLastName: string | null;
}

export class ListAppointmentsByClientResponse {
  @ApiProperty({ type: [ListAppointmentsByClientResponseItem] })
  items: Array<ListAppointmentsByClientResponseItem>;

  @ApiProperty()
  totalCount: number;
}
