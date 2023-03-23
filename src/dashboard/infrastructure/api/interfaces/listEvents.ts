import { ApiProperty } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export class ListEventsRequestQuery {
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}

export const listEventsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListEventsRequestQuery>({
    endDate: extendedJoi.date(),
    startDate: extendedJoi.date().max(extendedJoi.ref('endDate')),
  }),
});

class ListEventsResponseItem {
  @ApiProperty()
  appointmentId: number;

  @ApiProperty()
  appointmentTypeName: string;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  petId: number;

  @ApiProperty()
  petSpecies: PetSpecies;

  @ApiProperty()
  petName: string;

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

export class ListEventsResponse {
  @ApiProperty({ type: [ListEventsResponseItem] })
  items: Array<ListEventsResponseItem>;
}
