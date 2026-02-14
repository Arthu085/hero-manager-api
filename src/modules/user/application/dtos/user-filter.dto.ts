import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';

export class UserFilterDto extends FilterDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nome do usuário',
    example: 'João',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por personagem favorito',
    example: 'Superman',
  })
  @IsOptional()
  @IsString({ message: 'O personagem deve ser uma string' })
  character?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por função do usuário',
    enum: RoleEnum,
    example: RoleEnum.USUARIO,
  })
  @IsOptional()
  @IsEnum(RoleEnum, { message: 'A função deve ser um enum' })
  role?: RoleEnum;
}
