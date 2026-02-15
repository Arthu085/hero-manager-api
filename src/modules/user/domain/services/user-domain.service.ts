import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { NotFoundEntityException } from 'src/shared/exceptions/not-found-entity.exception';
import { SameStatusEntityException } from 'src/shared/exceptions/same-status-entity.exception';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { UserValidateRoleException } from '../exceptions/user-validate-role.exception';

@Injectable()
export class UserDomainService {
  constructor() {}

  validateUser(user: UserEntity | null): UserEntity {
    if (!user) {
      throw new NotFoundEntityException('Usuário não encontrado');
    }

    return user;
  }

  validateUserAndEnsureActive(user: UserEntity | null): UserEntity {
    const validatedUser = this.validateUser(user);
    validatedUser.ensureIsActive();

    return validatedUser;
  }

  validateUserSameStatus(user: UserEntity, status: StatusEnum): void {
    if (user.status === status) {
      throw new SameStatusEntityException('Usuário já está no mesmo status');
    }
  }

  validateRole(role: RoleEntity | null): RoleEntity {
    if (!role) {
      throw new NotFoundEntityException('Função não encontrada');
    }

    return role;
  }

  validateUserExistsCreate(user: UserEntity | null): void {
    if (user) {
      throw new UserAlreadyExistsException();
    }
  }

  validateUserExistsUpdate(
    updateUser: UserEntity,
    existingUser: UserEntity | null,
  ): void {
    if (existingUser && updateUser.id !== existingUser.id) {
      throw new UserAlreadyExistsException();
    }
  }

  validateAdminRole(user: UserEntity): void {
    if (user.role.name === RoleEnum.ADMIN) {
      throw new UserValidateRoleException(
        'Não é permitido excluir ou inativar um usuário com função de ADMIN',
      );
    }
  }
}
