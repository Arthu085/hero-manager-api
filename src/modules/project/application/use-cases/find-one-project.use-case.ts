import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { ProjectDomainService } from '../../domain/services/project-domain.service';
import { ProjectResponseOneDto } from '../dtos/project-response-one.dto';
import { ProjectEntity } from '../../domain/entities/project.entity';

@Injectable()
export class FindOneProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly projectDomainService: ProjectDomainService,
  ) {}

  async execute(uuid: UUID): Promise<ProjectResponseOneDto> {
    const project = await this.projectRepository.findOne(uuid);

    this.projectDomainService.validateProjectAndEnsureActive(project);

    return plainToInstance(ProjectResponseOneDto, project, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne(uuid);

    if (validateActive) {
      return this.projectDomainService.validateProjectAndEnsureActive(project);
    }

    return this.projectDomainService.validateProject(project);
  }
}
