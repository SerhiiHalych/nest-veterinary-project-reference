import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetGender } from '../../../../pet/application/enums/PetGender';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';

export class ListPetsByClientRequestParams {
  @ApiProperty()
  clientId: number;
}

export class ListPetsByClientRequestQuery {
  @ApiPropertyOptional()
  search?: string;
}

export const listPetsByClientRequestSchema = createRequestSchema({
  params: createObjectSchema<ListPetsByClientRequestParams>({
    clientId: extendedJoi.number(),
  }),
  query: createObjectSchema<ListPetsByClientRequestQuery>({
    search: extendedJoi.string().optional(),
  }),
});

class ListPetsByClientResponseItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  species: PetSpecies;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  gender: PetGender;

  @ApiProperty()
  isBiosterilized: boolean;

  @ApiProperty()
  dob: Date;
}

export class ListPetsByClientResponse {
  @ApiProperty({ type: [ListPetsByClientResponseItem] })
  items: Array<ListPetsByClientResponseItem>;
}
