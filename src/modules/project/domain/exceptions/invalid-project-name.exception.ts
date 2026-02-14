import { BadRequestException } from '@nestjs/common';

export class InvalidProjectNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de projeto inválido');
  }
}
