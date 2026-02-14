import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../enums/status.enum';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Novo status da entidade',
    enum: StatusEnum,
    example: StatusEnum.ATIVO,
  })
  @IsNotEmpty({ message: 'O campo status não pode ser vazio' })
  @IsEnum(StatusEnum, {
    message: 'O status deve ser um enum',
  })
  status: StatusEnum;
}
