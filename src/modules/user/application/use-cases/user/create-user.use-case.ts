import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from '../../dtos/user-create.dto';
import { FindOneRoleUseCase } from '../role/find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { UserEmail } from '../../../domain/value-objects/user-email.vo';
import { UserPassword } from '../../../domain/value-objects/user-password.vo';
import { UserName } from '../../../domain/value-objects/user-name.vo';
import { UserDomainService } from '../../../domain/services/user-domain.service';
import { IUserRepository } from 'src/modules/user/domain/interfaces/user.repository.interface';
import { IPasswordHasher } from 'src/modules/user/domain/interfaces/password-hasher.interface';
import { UserCharacter } from 'src/modules/user/domain/value-objects/user-character.vo';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    @Inject(forwardRef(() => FindOneUserUseCase))
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: UserCreateDto): Promise<void> {
    const binds = {
      name: UserName.create(dto.name),
      email: UserEmail.create(dto.email),
      password: UserPassword.create(dto.password),
      character: UserCharacter.create(dto.character),
      role: await this.findOneRoleUseCase.findByName(dto.role),
    };

    const existingUser = await this.findOneUserUseCase.findByEmail(
      binds.email.getValue(),
    );

    this.userDomainService.validateUserExistsCreate(existingUser);

    const hashedPassword = await this.passwordHasher.hash(
      binds.password.getValue(),
    );

    await this.userRepository.create({
      ...binds,
      name: binds.name.getValue(),
      email: binds.email.getValue(),
      character: binds.character.getValue(),
      password: hashedPassword,
    });
  }

  // async register(binds: {
  //   name: UserName;
  //   email: UserEmail;
  //   password: UserPassword;
  //   role: RoleEnum;
  // }): Promise<UserEntity> {
  //   const existingUser = await this.findOneUserUseCase.findByEmail(
  //     binds.email.getValue(),
  //   );

  //   this.userDomainService.validateUserExistsCreate(existingUser);

  //   const hashedPassword = await this.passwordHasher.hash(
  //     binds.password.getValue(),
  //   );

  //   const roleEntity = await this.findOneRoleUseCase.findByName(binds.role);

  //   return await this.userRepository.create({
  //     name: binds.name.getValue(),
  //     email: binds.email.getValue(),
  //     password: hashedPassword,
  //     role: roleEntity,
  //   });
  // }
}
