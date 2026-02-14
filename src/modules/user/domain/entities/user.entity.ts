import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from 'database/entities/base.entity';

@Entity('user', { comment: 'Tabela para cadastro de usuários' })
@Index(['name', 'character', 'role'])
@Index('IDX_user_email_unique_when_not_deleted', ['email'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class UserEntity extends BaseEntity {
  @Column({ length: 200, comment: 'Nome do usuário' })
  @Index()
  name: string;

  @Column({ length: 250, comment: 'Email do usuário' })
  @Index()
  email: string;

  @Column({ length: 300, comment: 'Senha do usuário' })
  password: string;

  @Column({ length: 200, comment: 'Personagem favorito do usuário' })
  @Index()
  character: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  @Index()
  role: RoleEntity;
}
