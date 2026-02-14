import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    minLength: 3,
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(200, { message: 'O nome deve ter no máximo 200 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
    maxLength: 250,
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsString({ message: 'O e-mail deve ser uma string' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @MaxLength(250, { message: 'O e-mail deve ter no máximo 250 caracteres' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
    minLength: 6,
    maxLength: 100,
    format: 'password',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(100, { message: 'A senha deve ter no máximo 100 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Personagem do usuário',
    example: 'Superman',
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'O personagem é obrigatório' })
  @IsString({ message: 'O personagem deve ser uma string' })
  @MaxLength(200, { message: 'O personagem deve ter no máximo 200 caracteres' })
  character: string;
}
