import { BadRequestException } from '@nestjs/common';

export class UserValidateRoleException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Função do usuário inválida');
  }
}
