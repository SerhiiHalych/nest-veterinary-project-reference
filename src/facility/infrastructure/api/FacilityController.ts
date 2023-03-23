import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Facility')
@Controller({
  path: 'facilities',
})
export class FacilityController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
