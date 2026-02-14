import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { ProjectFilterDto } from '../../application/dtos/project-filter.dto';
import { ProjectEntity } from '../entities/project.entity';

export const IProjectRepository = Symbol('IProjectRepository');

export interface IProjectRepository {
  findAll(
    filters: ProjectFilterDto,
    take: number,
    skip: number,
  ): Promise<[ProjectEntity[], number]>;

  findOne(uuid: UUID): Promise<ProjectEntity | null>;

  create(project: Partial<ProjectEntity>): Promise<ProjectEntity>;

  update(uuid: UUID, data: Partial<ProjectEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
