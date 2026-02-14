import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IProjectRepository } from '../../domain/interfaces/project.repository.interface';
import { ProjectFilterDto } from '../dtos/project-filter.dto';
import { ProjectResponseAllDto } from '../dtos/project-response-all.dto';

@Injectable()
export class FindAllProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(
    filters: ProjectFilterDto,
  ): Promise<IPaginatedResponse<ProjectResponseAllDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await this.projectRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<ProjectResponseAllDto>();

    response.data = plainToInstance(ProjectResponseAllDto, projects, {
      excludeExtraneousValues: true,
    });
    response.meta = {
      total,
      page,
      limit,
      lastPage,
    };

    return response;
  }
}
