import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectFilterDto } from '../../application/dtos/project-filter.dto';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repo: Repository<ProjectEntity>,
  ) {}

  findAll(
    filters: ProjectFilterDto,
    take: number,
    skip: number,
  ): Promise<[ProjectEntity[], number]> {
    const where: FindOptionsWhere<ProjectEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.projectStatus) {
      where.projectStatus = filters.projectStatus;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.user) {
      where.user = { uuid: filters.user };
    }

    return this.repo.findAndCount({
      where,
      relations: ['user'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<ProjectEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['user'],
      withDeleted: false,
    });
  }
  create(project: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const newProject = this.repo.create(project);
    return this.repo.save(newProject);
  }

  update(uuid: UUID, data: Partial<ProjectEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
