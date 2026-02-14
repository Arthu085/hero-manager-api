import { NotFoundException } from '@nestjs/common';

export class NotFoundEntityException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Entidade não encontrada');
  }
}
