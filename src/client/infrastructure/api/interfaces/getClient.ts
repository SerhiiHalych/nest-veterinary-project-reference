import { ApiProperty } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';

export class GetClientRequestParams {
  @ApiProperty()
  id: number;
}

export const getClientRequestSchema = createRequestSchema({
  params: createObjectSchema<GetClientRequestParams>({
    id: extendedJoi.number().positive(),
  }),
});

export class GetClientResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  firstName: string | null;

  @ApiProperty({ nullable: true })
  lastName: string | null;

  @ApiProperty({ nullable: true })
  address: string | null;

  @ApiProperty({ nullable: true })
  phoneNumber: string | null;
}
