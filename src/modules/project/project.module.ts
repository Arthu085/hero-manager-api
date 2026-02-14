import { Module } from '@nestjs/common';
import { ProjectEntity } from './domain/entities/project.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectProtectedController } from './infra/controllers/project-protected.controller';
import { ProjectPublicController } from './infra/controllers/project-public.controller';
import { IProjectRepository } from './domain/interfaces/project.repository.interface';
import { ProjectRepository } from './infra/repositories/project.repository';
import { ProjectDomainService } from './domain/services/project-domain.service';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { FindOneProjectUseCase } from './application/use-cases/find-one-project.use-case';
import { FindAllProjectUseCase } from './application/use-cases/find-all-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/delete-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), UserModule],
  controllers: [ProjectProtectedController, ProjectPublicController],
  providers: [
    {
      provide: IProjectRepository,
      useClass: ProjectRepository,
    },
    ProjectDomainService,
    CreateProjectUseCase,
    UpdateProjectUseCase,
    FindOneProjectUseCase,
    FindAllProjectUseCase,
    DeleteProjectUseCase,
  ],
  exports: [FindOneProjectUseCase],
})
export class ProjectModule {}
