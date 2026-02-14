import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { UUID } from 'crypto';

export class ProjectFilterDto extends FilterDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nome do projeto',
    example: 'Projeto Alpha',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status do projeto',
    enum: ProjectStatus,
    example: ProjectStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ProjectStatus, { message: 'O status deve ser um enum' })
  projectStatus?: ProjectStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por usuário responsável (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'O UUID do usuário é inválido' })
  user?: UUID;
}
