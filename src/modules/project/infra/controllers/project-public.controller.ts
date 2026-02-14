import { Controller } from '@nestjs/common';
import { Public } from 'src/modules/auth/infra/decorators/public.decorator';

@Controller('project')
@Public()
export class ProjectPublicController {}
