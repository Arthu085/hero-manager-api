import { BaseEntity } from 'database/entities/base.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { Column, Entity } from 'typeorm';

@Entity('role', { comment: 'Tabela para cadastro de funções' })
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: RoleEnum,
    unique: true,
    comment: 'Nome da função',
  })
  name: RoleEnum;
}
