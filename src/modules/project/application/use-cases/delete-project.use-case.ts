import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { FindOneProjectUseCase } from './find-one-project.use-case';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneProjectUseCase.findEntityByUuid(uuid, false);
    await this.projectRepository.softDelete(uuid);
  }
}
