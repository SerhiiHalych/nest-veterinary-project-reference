import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medication')
@Controller({
  path: 'medications',
})
export class MedicationController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
