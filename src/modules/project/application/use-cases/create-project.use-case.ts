import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { UUID } from 'crypto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/user/find-one-user.use-case';
import { ProjectCreateDto } from '../dtos/project-create.dto';
import { ProjectName } from '../../domain/value-objects/project-name.vo';
import { ProjectDescription } from '../../domain/value-objects/project-description.vo';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { ProjectAgility } from '../../domain/value-objects/project-agility.vo';
import { ProjectEnchantment } from '../../domain/value-objects/project-enchantment.vo';
import { ProjectEfficiency } from '../../domain/value-objects/project-efficiency.vo';
import { ProjectExcellence } from '../../domain/value-objects/project-excellence.vo';
import { ProjectTransparency } from '../../domain/value-objects/project-transparency.vo';
import { ProjectAmbition } from '../../domain/value-objects/project-ambition.vo';
import { ProjectCompletionPercentage } from '../../domain/value-objects/project-completion-percentage.vo';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(dto: ProjectCreateDto): Promise<void> {
    const binds = {
      user: await this.findOneUserUseCase.findEntityByUuid(dto.user),
      name: ProjectName.create(dto.name),
      description: ProjectDescription.create(dto.description),
      agility: ProjectAgility.create(dto.agility),
      enchantment: ProjectEnchantment.create(dto.enchantment),
      efficiency: ProjectEfficiency.create(dto.efficiency),
      excellence: ProjectExcellence.create(dto.excellence),
      transparency: ProjectTransparency.create(dto.transparency),
      ambition: ProjectAmbition.create(dto.ambition),
    };

    const metrics = [
      binds.agility.getValue(),
      binds.enchantment.getValue(),
      binds.efficiency.getValue(),
      binds.excellence.getValue(),
      binds.transparency.getValue(),
      binds.ambition.getValue(),
    ];
    const sum = metrics.reduce((acc, metric) => acc + metric, 0);
    const completionPercentage = Math.round((sum / metrics.length) * 100) / 100;

    let projectStatus = ProjectStatus.PENDING;

    if (completionPercentage === 100) {
      projectStatus = ProjectStatus.COMPLETED;
    } else if (completionPercentage > 0) {
      projectStatus = ProjectStatus.IN_PROGRESS;
    }

    await this.projectRepository.create({
      ...binds,
      name: binds.name.getValue(),
      description: binds.description.getValue(),
      projectStatus,
      agility: binds.agility.getValue(),
      enchantment: binds.enchantment.getValue(),
      efficiency: binds.efficiency.getValue(),
      excellence: binds.excellence.getValue(),
      transparency: binds.transparency.getValue(),
      ambition: binds.ambition.getValue(),
      completionPercentage,
    });
  }
}
