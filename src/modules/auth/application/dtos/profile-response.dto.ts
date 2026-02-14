import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { StatusResponseDto } from 'src/shared/dtos/status-response.dto';
import { RoleEnumTranslated } from 'src/shared/enums/role.enum';

export class ProfileResponseDto extends StatusResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  character: string;

  @Expose()
  @Transform(({ value }) =>
    value
      ? {
          value,
          label:
            RoleEnumTranslated[value as keyof typeof RoleEnumTranslated] ||
            value,
        }
      : null,
  )
  role: { value: string; label: string } | null;
}
