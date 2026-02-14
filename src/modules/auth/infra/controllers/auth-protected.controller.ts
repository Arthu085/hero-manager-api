import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { FindOneProfileUseCase } from '../../application/use-cases/find-one-profile.use-case';
import { UserPayload } from 'src/shared/interfaces/user-payload.interface';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
@ApiTags('Auth Protected')
@ApiBearerAuth()
@ApiCookieAuth('token')
export class AuthProtectedController {
  constructor(private readonly findOneProfileUseCase: FindOneProfileUseCase) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Obter perfil do usuário autenticado',
    description: 'Retorna os dados do perfil do usuário logado',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil encontrado com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ResponseMessage('Perfil encontrado com sucesso')
  profile(@CurrentUser() user: UserPayload) {
    return this.findOneProfileUseCase.execute(user);
  }
}
