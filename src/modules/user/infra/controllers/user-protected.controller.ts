import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { UserCreateDto } from '../../application/dtos/user-create.dto';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';
import { UserUpdateDto } from '../../application/dtos/user-update.dto';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { Roles } from 'src/modules/auth/infra/decorators/role.decorator';
import { FindAllUserUseCase } from '../../application/use-cases/user/find-all-user.use-case';
import { FindOneUserUseCase } from '../../application/use-cases/user/find-one-user.use-case';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User Protected')
@ApiBearerAuth()
@ApiCookieAuth('token')
@Roles(RoleEnum.ADMIN)
export class UserProtectedController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Retorna uma lista paginada de usuários com filtros opcionais',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuários encontrados com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ResponseMessage('Usuários encontrados com sucesso')
  findAll(@Query() filters: UserFilterDto) {
    return this.findAllUsersUseCase.execute(filters);
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Buscar usuário por UUID',
    description: 'Retorna os detalhes de um usuário específico',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ResponseMessage('Usuário encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneUserUseCase.execute(uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário',
    description: 'Cria um novo usuário no sistema',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ResponseMessage('Usuário criado com sucesso')
  create(@Body() dto: UserCreateDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza parcialmente os dados de um usuário',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ResponseMessage('Usuário atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: UserUpdateDto,
  ) {
    return this.updateUserUseCase.execute(uuid, dto);
  }

  @Put(':uuid')
  @ApiOperation({
    summary: 'Alterar status do usuário',
    description: 'Ativa ou desativa um usuário',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou mesmo status' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ResponseMessage('Status do usuário atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.updateUserUseCase.updateStatus(uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({
    summary: 'Deletar usuário',
    description: 'Remove um usuário do sistema (soft delete)',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Não é possível deletar usuário ADMIN',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ResponseMessage('Usuário deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.deleteUserUseCase.execute(uuid);
  }
}
