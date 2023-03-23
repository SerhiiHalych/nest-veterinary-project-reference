import { ApiProperty } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/infrastructure/validation/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/infrastructure/validation/joi/createRequestSchema';
import { extendedJoi } from '../../../../common/infrastructure/validation/joi/extendedJoi';
import { PetGender } from '../../../../pet/application/enums/PetGender';
import { PetSpecies } from '../../../../pet/application/enums/PetSpecies';
import { Appetite } from '../../../application/enums/Appetite';
import { Defecation } from '../../../application/enums/Defecation';
import { GeneralState } from '../../../application/enums/GeneralState';
import { HeartAuscultation } from '../../../application/enums/HeartAuscultation';
import { LungAuscultation } from '../../../application/enums/LungAuscultation';
import { Mucous } from '../../../application/enums/Mucous';
import { SkinTurgor } from '../../../application/enums/SkinTurgor';
import { Urination } from '../../../application/enums/Urination';
import { Vomiting } from '../../../application/enums/Vomiting';

export class GetAppointmentRequestParams {
  @ApiProperty()
  id: number;
}

export const getAppointmentRequestSchema = createRequestSchema({
  params: createObjectSchema<GetAppointmentRequestParams>({
    id: extendedJoi.number().positive(),
  }),
});

class GetAppointmentResponseProcedure {
  id: number;
  name: string;
  sale: number;
  price: number;
  amount: number;
}
class GetAppointmentResponseMedication {
  id: number;
  name: string;
  unit: string;
  amount: number;
  price: number;
  priceIncluded: boolean;
}
class GetAppointmentResponseDoctor {
  id: number;
  firstName: string | null;
  lastName: string | null;
}
class GetAppointmentResponseClient {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}
class GetAppointmentResponsePet {
  id: number;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  isBiosterilized: boolean;
  dob: Date;
}
class GetAppointmentResponseFacility {
  id: number;
  address: string;
}
class GetAppointmentResponseAnamnesis {
  description: string | null;
  generalState: GeneralState;
  temperature: number | null;
  appetite: Appetite;
  vomiting: Vomiting;
  defecation: Defecation;
  urination: Urination;
  mucous: Mucous;
  skinTurgor: SkinTurgor;
  heartAuscultation: HeartAuscultation;
  lungAuscultation: LungAuscultation;
  notes: string | null;
}
export class GetAppointmentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  appointmentTypeId: number;

  @ApiProperty()
  appointmentTypeName: string;

  @ApiProperty()
  appointmentTypePrice: number;

  @ApiProperty()
  date: Date | null;

  @ApiProperty({ nullable: true })
  treatment: string | null;

  @ApiProperty({ nullable: true })
  diagnosis: string | null;

  @ApiProperty({ type: GetAppointmentResponseAnamnesis, nullable: true })
  anamnesis: GetAppointmentResponseAnamnesis | null;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  sale: number;

  @ApiProperty({ type: GetAppointmentResponseFacility })
  facility: GetAppointmentResponseFacility;

  @ApiProperty({ type: GetAppointmentResponsePet, nullable: true })
  pet: GetAppointmentResponsePet | null;

  @ApiProperty({ type: GetAppointmentResponseDoctor, nullable: true })
  doctor: GetAppointmentResponseDoctor | null;

  @ApiProperty({ type: GetAppointmentResponseClient, nullable: true })
  client: GetAppointmentResponseClient | null;

  @ApiProperty({ type: [GetAppointmentResponseMedication] })
  medications: Array<GetAppointmentResponseMedication>;

  @ApiProperty({ type: [GetAppointmentResponseProcedure] })
  procedures: Array<GetAppointmentResponseProcedure>;
}
