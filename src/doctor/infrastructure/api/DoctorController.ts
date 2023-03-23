import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Doctor')
@Controller({
  path: 'doctors',
})
export class DoctorController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
