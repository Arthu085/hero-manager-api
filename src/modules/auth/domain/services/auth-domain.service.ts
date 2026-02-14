import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { IPasswordHasher } from 'src/modules/user/domain/interfaces/password-hasher.interface';

@Injectable()
export class AuthDomainService {
  constructor(
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async validateCredentialsLogin(
    user: UserEntity | null,
    password: string,
  ): Promise<UserEntity> {
    if (!user) {
      throw new InvalidCredentialsException();
    }

    user.ensureIsActive();

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
