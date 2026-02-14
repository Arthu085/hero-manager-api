import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { IUserRepository } from 'src/modules/user/domain/interfaces/user.repository.interface';
import { UserDomainService } from 'src/modules/user/domain/services/user-domain.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    this.userDomainService.validateAdminRole(user);

    await this.userRepository.softDelete(uuid);
  }
}
