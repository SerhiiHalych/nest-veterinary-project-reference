import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';

export class ListClientsRequestQuery {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  search?: string;
}

export const listClientsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListClientsRequestQuery>({
    skip: extendedJoi.number(),
    take: extendedJoi.number(),
    search: extendedJoi.string().optional(),
  }),
});

class ListClientsResponseItem {
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

export class ListClientsResponse {
  @ApiProperty({ type: [ListClientsResponseItem] })
  items: Array<ListClientsResponseItem>;

  @ApiProperty()
  totalCount: number;
}
