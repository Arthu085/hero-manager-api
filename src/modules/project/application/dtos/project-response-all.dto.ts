import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { StatusResponseDto } from 'src/shared/dtos/status-response.dto';
import { ProjectStatusEnumTranslated } from '../../domain/enums/project-status.enum';

export class ProjectResponseAllDto extends StatusResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.projectStatus
      ? {
          value: obj.projectStatus,
          label:
            ProjectStatusEnumTranslated[
              obj.projectStatus as keyof typeof ProjectStatusEnumTranslated
            ] || obj.projectStatus,
        }
      : null,
  )
  projectStatus: { value: string; label: string } | null;

  @Expose()
  agility: number;

  @Expose()
  enchantment: number;

  @Expose()
  efficiency: number;

  @Expose()
  excellence: number;

  @Expose()
  transparency: number;

  @Expose()
  ambition: number;

  @Expose()
  completionPercentage: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.name || null)
  userName: string | null;

  @Expose()
  @Transform(({ obj }) => obj.user?.character || null)
  userCharacter: string | null;
}
