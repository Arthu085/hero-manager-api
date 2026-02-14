import { Expose, Transform } from 'class-transformer';
import { StatusEnumTranslated } from '../enums/status.enum';

export class StatusResponseDto {
  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated] ||
      obj.status,
  }))
  status: { value: string; label: string };
}
