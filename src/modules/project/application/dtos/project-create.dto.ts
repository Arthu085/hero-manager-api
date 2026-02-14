import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectCreateDto {
  @ApiProperty({
    description: 'Nome do projeto',
    example: 'Projeto Alpha',
    minLength: 3,
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(200, { message: 'O nome deve ter no máximo 200 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descrição do projeto',
    example: 'Projeto de desenvolvimento de sistema de gerenciamento de heróis',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  @MaxLength(1000, {
    message: 'A descrição deve ter no máximo 1000 caracteres',
  })
  description: string;

  @ApiProperty({
    description: 'Agilidade do projeto',
    example: 80,
  })
  @IsNotEmpty({ message: 'A agilidade é obrigatória' })
  @IsNumber({}, { message: 'A agilidade deve ser um número' })
  @Min(0, { message: 'A agilidade deve ser no mínimo 0' })
  @Max(100, { message: 'A agilidade deve ser no máximo 100' })
  agility: number;

  @ApiProperty({
    description: 'Encantamento do projeto',
    example: 90,
  })
  @IsNotEmpty({ message: 'O encantamento é obrigatório' })
  @IsNumber({}, { message: 'O encantamento deve ser um número' })
  @Min(0, { message: 'O encantamento deve ser no mínimo 0' })
  @Max(100, { message: 'O encantamento deve ser no máximo 100' })
  enchantment: number;

  @ApiProperty({
    description: 'Eficiência do projeto',
    example: 85,
  })
  @IsNotEmpty({ message: 'A eficiência é obrigatória' })
  @IsNumber({}, { message: 'A eficiência deve ser um número' })
  @Min(0, { message: 'A eficiência deve ser no mínimo 0' })
  @Max(100, { message: 'A eficiência deve ser no máximo 100' })
  efficiency: number;

  @ApiProperty({
    description: 'Excelência do projeto',
    example: 95,
  })
  @IsNotEmpty({ message: 'A excelência é obrigatória' })
  @IsNumber({}, { message: 'A excelência deve ser um número' })
  @Min(0, { message: 'A excelência deve ser no mínimo 0' })
  @Max(100, { message: 'A excelência deve ser no máximo 100' })
  excellence: number;

  @ApiProperty({
    description: 'Transparência do projeto',
    example: 95,
  })
  @IsNotEmpty({ message: 'A transparência é obrigatória' })
  @IsNumber({}, { message: 'A transparência deve ser um número' })
  @Min(0, { message: 'A transparência deve ser no mínimo 0' })
  @Max(100, { message: 'A transparência deve ser no máximo 100' })
  transparency: number;

  @ApiProperty({
    description: 'Ambição do projeto',
    example: 95,
  })
  @IsNotEmpty({ message: 'A ambição é obrigatória' })
  @IsNumber({}, { message: 'A ambição deve ser um número' })
  @Min(0, { message: 'A ambição deve ser no mínimo 0' })
  @Max(100, { message: 'A ambição deve ser no máximo 100' })
  ambition: number;
}
