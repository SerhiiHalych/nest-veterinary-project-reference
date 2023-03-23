import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedure')
@Controller({
  path: 'procedures',
})
export class ProcedureController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
