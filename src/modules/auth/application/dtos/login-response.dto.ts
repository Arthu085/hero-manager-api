import { Expose, Transform } from 'class-transformer';
import { StatusResponseDto } from 'src/shared/dtos/status-response.dto';
import { RoleEnumTranslated } from 'src/shared/enums/role.enum';

export class LoginResponseDto extends StatusResponseDto {
  @Expose()
  token: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  character: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.role
      ? {
          value: obj.role.name,
          label:
            RoleEnumTranslated[
              obj.role.name as keyof typeof RoleEnumTranslated
            ] || obj.role.name,
        }
      : null;
  })
  role: { value: string; label: string } | null;
}
