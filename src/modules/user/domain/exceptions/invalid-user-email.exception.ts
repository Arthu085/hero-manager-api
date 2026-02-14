import { BadRequestException } from '@nestjs/common';

export class InvalidUserEmailException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Email inválido');
  }
}
