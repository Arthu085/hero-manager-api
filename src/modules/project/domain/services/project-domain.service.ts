import { Injectable } from '@nestjs/common';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ProjectEntity } from '../entities/project.entity';
import { NotFoundEntityException } from 'src/shared/exceptions/not-found-entity.exception';
import { SameStatusEntityException } from 'src/shared/exceptions/same-status-entity.exception';

@Injectable()
export class ProjectDomainService {
  constructor() {}

  validateProject(project: ProjectEntity | null): ProjectEntity {
    if (!project) {
      throw new NotFoundEntityException('Projeto não encontrado');
    }

    return project;
  }

  validateProjectAndEnsureActive(project: ProjectEntity | null): ProjectEntity {
    const validated = this.validateProject(project);
    validated.ensureIsActive();

    return validated;
  }

  validateProjectSameStatus(project: ProjectEntity, status: StatusEnum): void {
    if (project.status === status) {
      throw new SameStatusEntityException('Projeto já está no mesmo status');
    }
  }
}
