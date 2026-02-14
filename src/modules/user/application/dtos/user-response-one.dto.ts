import { Expose } from 'class-transformer';
import { UserResponseAllDto } from './user-response-all.dto';

export class UserResponseOneDto extends UserResponseAllDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
