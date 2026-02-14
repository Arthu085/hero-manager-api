import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserUpdateDto } from '../../dtos/user-update.dto';
import { FindOneRoleUseCase } from '../role/find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { UserEmail } from '../../../domain/value-objects/user-email.vo';
import { UserPassword } from '../../../domain/value-objects/user-password.vo';
import { UserName } from '../../../domain/value-objects/user-name.vo';
import { IUserRepository } from 'src/modules/user/domain/interfaces/user.repository.interface';
import { IPasswordHasher } from 'src/modules/user/domain/interfaces/password-hasher.interface';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
  ) {}

  async execute(uuid: UUID, dto: UserUpdateDto): Promise<void> {
    const binds = {
      name: dto.name ? UserName.create(dto.name) : undefined,
      email: dto.email ? UserEmail.create(dto.email) : undefined,
      password: dto.password ? UserPassword.create(dto.password) : undefined,
      character: dto.character ? UserName.create(dto.character) : undefined,
      role: dto.role
        ? await this.findOneRoleUseCase.findByName(dto.role)
        : undefined,
    };

    const user = await this.findOneUserUseCase.findEntityByUuid(uuid);

    if (binds.name) {
      user.changeName(binds.name);
    }

    if (binds.email) {
      const currentEmail = UserEmail.create(user.email);
      if (!binds.email.equals(currentEmail)) {
        const existingUserWithEmail = await this.findOneUserUseCase.findByEmail(
          binds.email.getValue(),
        );

        this.userDomainService.validateUserExistsUpdate(
          user,
          existingUserWithEmail,
        );

        user.changeEmail(binds.email);
      }
    }

    if (binds.role) {
      user.changeRole(binds.role);
    }

    if (binds.password) {
      const hashedPassword = await this.passwordHasher.hash(
        binds.password.getValue(),
      );
      const hashedPasswordVO = UserPassword.createFromHash(hashedPassword);
      user.changePassword(hashedPasswordVO);
    }

    await this.userRepository.update(user.uuid, user);
  }

  async updateStatus(uuid: UUID, dto: ChangeStatusDto): Promise<void> {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    this.userDomainService.validateAdminRole(user);
    this.userDomainService.validateUserSameStatus(user, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      user.activate();
    } else {
      user.deactivate();
    }

    await this.userRepository.update(user.uuid, user);
  }
}
