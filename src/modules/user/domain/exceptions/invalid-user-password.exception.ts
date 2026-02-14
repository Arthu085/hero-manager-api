import { BadRequestException } from '@nestjs/common';

export class InvalidUserPasswordException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Senha inválida');
  }
}
