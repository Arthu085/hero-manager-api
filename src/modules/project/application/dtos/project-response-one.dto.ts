import { Expose } from 'class-transformer';
import { ProjectResponseAllDto } from './project-response-all.dto';

export class ProjectResponseOneDto extends ProjectResponseAllDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
