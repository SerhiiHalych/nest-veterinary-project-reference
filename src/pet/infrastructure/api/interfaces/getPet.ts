import { ApiProperty } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetGender } from '../../../application/enums/PetGender';
import { PetSpecies } from '../../../application/enums/PetSpecies';

export class GetPetRequestParams {
  @ApiProperty()
  id: number;
}

export const getPetRequestSchema = createRequestSchema({
  params: createObjectSchema<GetPetRequestParams>({
    id: extendedJoi.number().positive(),
  }),
});

class GetPetResponseOwner {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;
}

export class GetPetResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: GetPetResponseOwner, nullable: true })
  owner: GetPetResponseOwner | null;

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
