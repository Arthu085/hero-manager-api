import { BadRequestException } from '@nestjs/common';

export class InactiveEntityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Entidade inativa');
  }
}
