import { ConflictException } from '@nestjs/common';

export class SameStatusEntityException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Não é possível alterar para o mesmo status');
  }
}
