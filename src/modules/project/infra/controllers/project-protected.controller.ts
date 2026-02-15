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
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { Roles } from 'src/modules/auth/infra/decorators/role.decorator';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllProjectUseCase } from '../../application/use-cases/find-all-project.use-case';
import { FindOneProjectUseCase } from '../../application/use-cases/find-one-project.use-case';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { ProjectFilterDto } from '../../application/dtos/project-filter.dto';
import { ProjectCreateDto } from '../../application/dtos/project-create.dto';
import { CurrentUser } from 'src/modules/auth/infra/decorators/current-user.decorator';
import { ProjectUpdateDto } from '../../application/dtos/project-update.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('project')
@ApiTags('Project Protected')
@ApiBearerAuth()
@ApiCookieAuth('token')
export class ProjectProtectedController {
  constructor(
    private readonly findAllProjectsUseCase: FindAllProjectUseCase,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.USUARIO)
  @Get()
  @ApiOperation({
    summary: 'Listar projetos',
    description: 'Retorna uma lista paginada de projetos com filtros opcionais',
  })
  @ApiResponse({
    status: 200,
    description: 'Projetos encontrados com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ResponseMessage('Projetos encontrados com sucesso')
  findAll(@Query() filters: ProjectFilterDto) {
    return this.findAllProjectsUseCase.execute(filters);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USUARIO)
  @Get(':uuid')
  @ApiOperation({
    summary: 'Buscar projeto por UUID',
    description: 'Retorna os detalhes de um projeto específico',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do projeto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Projeto encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @ResponseMessage('Projeto encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneProjectUseCase.execute(uuid);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  @ApiOperation({
    summary: 'Criar novo projeto',
    description: 'Cria um novo projeto no sistema',
  })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ResponseMessage('Projeto criado com sucesso')
  create(@Body() dto: ProjectCreateDto) {
    return this.createProjectUseCase.execute(dto);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':uuid')
  @ApiOperation({
    summary: 'Atualizar projeto',
    description: 'Atualiza parcialmente os dados de um projeto',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do projeto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @ResponseMessage('Projeto atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: ProjectUpdateDto,
  ) {
    return this.updateProjectUseCase.execute(uuid, dto);
  }

  @Roles(RoleEnum.ADMIN)
  @Put(':uuid')
  @ApiOperation({
    summary: 'Alterar status do projeto',
    description: 'Ativa ou desativa um projeto',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do projeto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do projeto atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou mesmo status' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @ResponseMessage('Status do projeto atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: ChangeStatusDto,
  ) {
    return this.updateProjectUseCase.updateStatus(uuid, dto);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':uuid')
  @ApiOperation({
    summary: 'Deletar projeto',
    description: 'Remove um projeto do sistema (soft delete)',
  })
  @ApiParam({
    name: 'uuid',
    description: 'UUID do projeto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Projeto deletado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  @ResponseMessage('Projeto deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.deleteProjectUseCase.execute(uuid);
  }
}
