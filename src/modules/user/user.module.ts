import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/entities/role.entity';
import { UserEntity } from './domain/entities/user.entity';
import { UserDomainService } from './domain/services/user-domain.service';
import { UserPublicController } from './infra/controllers/user-public.controller';
import { UserProtectedController } from './infra/controllers/user-protected.controller';
import { IUserRepository } from './domain/interfaces/user.repository.interface';
import { UserRepository } from './infra/repositories/user.repository';
import { IRoleRepository } from './domain/interfaces/role.repository.interface';
import { RoleRepository } from './infra/repositories/role.repository';
import { IPasswordHasher } from './domain/interfaces/password-hasher.interface';
import { PasswordHasherService } from './infra/services/password-hasher.service';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { FindOneUserUseCase } from './application/use-cases/user/find-one-user.use-case';
import { FindOneRoleUseCase } from './application/use-cases/role/find-one-role.use-case';
import { DeleteUserUseCase } from './application/use-cases/user/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/user/find-all-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserPublicController, UserProtectedController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: IPasswordHasher,
      useClass: PasswordHasherService,
    },
    UserDomainService,
    CreateUserUseCase,
    FindOneUserUseCase,
    FindOneRoleUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    FindAllUserUseCase,
  ],
  exports: [
    IUserRepository,
    IPasswordHasher,
    FindOneUserUseCase,
    FindOneRoleUseCase,
    UserDomainService,
    CreateUserUseCase,
  ],
})
export class UserModule {}
