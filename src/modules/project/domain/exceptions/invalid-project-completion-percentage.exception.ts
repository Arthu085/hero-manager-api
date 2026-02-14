import { BadRequestException } from '@nestjs/common';

export class InvalidProjectCompletionPercentageException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Porcentagem de conclusão de projeto inválida');
  }
}
