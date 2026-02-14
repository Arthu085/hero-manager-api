import { BadRequestException } from '@nestjs/common';

export class InvalidUserCharacterException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome do personagem inválido');
  }
}
