import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { FindOneProjectUseCase } from './find-one-project.use-case';
import { ProjectUpdateDto } from '../dtos/project-update.dto';
import { ProjectName } from '../../domain/value-objects/project-name.vo';
import { ProjectDescription } from '../../domain/value-objects/project-description.vo';
import { ProjectAgility } from '../../domain/value-objects/project-agility.vo';
import { ProjectEnchantment } from '../../domain/value-objects/project-enchantment.vo';
import { ProjectEfficiency } from '../../domain/value-objects/project-efficiency.vo';
import { ProjectExcellence } from '../../domain/value-objects/project-excellence.vo';
import { ProjectTransparency } from '../../domain/value-objects/project-transparency.vo';
import { ProjectAmbition } from '../../domain/value-objects/project-ambition.vo';
import { ProjectDomainService } from '../../domain/services/project-domain.service';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/user/find-one-user.use-case';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly projectDomainService: ProjectDomainService,
  ) {}

  async execute(uuid: UUID, dto: ProjectUpdateDto): Promise<void> {
    const binds = {
      user: dto.user
        ? await this.findOneUserUseCase.findEntityByUuid(dto.user)
        : undefined,
      name: dto.name ? ProjectName.create(dto.name) : undefined,
      description: dto.description
        ? ProjectDescription.create(dto.description)
        : undefined,
      agility:
        dto.agility != null ? ProjectAgility.create(dto.agility) : undefined,
      enchantment:
        dto.enchantment != null
          ? ProjectEnchantment.create(dto.enchantment)
          : undefined,
      efficiency:
        dto.efficiency != null
          ? ProjectEfficiency.create(dto.efficiency)
          : undefined,
      excellence:
        dto.excellence != null
          ? ProjectExcellence.create(dto.excellence)
          : undefined,
      transparency:
        dto.transparency != null
          ? ProjectTransparency.create(dto.transparency)
          : undefined,
      ambition:
        dto.ambition != null ? ProjectAmbition.create(dto.ambition) : undefined,
    };

    const project = await this.findOneProjectUseCase.findEntityByUuid(uuid);

    if (binds.user) {
      project.changeUser(binds.user);
    }

    if (binds.name) {
      project.changeName(binds.name);
    }

    if (binds.description) {
      project.changeDescription(binds.description);
    }

    if (binds.agility) {
      project.changeAgility(binds.agility);
    }

    if (binds.enchantment) {
      project.changeEnchantment(binds.enchantment);
    }

    if (binds.efficiency) {
      project.changeEfficiency(binds.efficiency);
    }

    if (binds.excellence) {
      project.changeExcellence(binds.excellence);
    }

    if (binds.transparency) {
      project.changeTransparency(binds.transparency);
    }

    if (binds.ambition) {
      project.changeAmbition(binds.ambition);
    }

    await this.projectRepository.update(project.uuid, project);
  }

  async updateStatus(uuid: UUID, dto: ChangeStatusDto): Promise<void> {
    const project = await this.findOneProjectUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.projectDomainService.validateProjectSameStatus(project, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      project.activate();
    } else {
      project.deactivate();
    }

    await this.projectRepository.update(project.uuid, project);
  }
}
