import { BadRequestException } from '@nestjs/common';

export class InvalidProjectMetricException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Métrica de projeto inválida');
  }
}
