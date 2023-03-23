import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetGender } from '../../../application/enums/PetGender';
import { PetSpecies } from '../../../application/enums/PetSpecies';

export class ListPetsRequestQuery {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  withoutOwner?: boolean;
}

export const listPetsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListPetsRequestQuery>({
    skip: extendedJoi.number(),
    take: extendedJoi.number(),
    search: extendedJoi.string().optional(),
    withoutOwner: extendedJoi.boolean().optional(),
  }),
});

class ListPetsResponseItem {
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
  dob: Date;
}

export class ListPetsResponse {
  @ApiProperty({ type: [ListPetsResponseItem] })
  items: Array<ListPetsResponseItem>;

  @ApiProperty()
  totalCount: number;
}
