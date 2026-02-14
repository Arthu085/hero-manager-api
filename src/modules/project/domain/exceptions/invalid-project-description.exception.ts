import { BadRequestException } from '@nestjs/common';

export class InvalidProjectDescriptionException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Descrição de projeto inválida');
  }
}
