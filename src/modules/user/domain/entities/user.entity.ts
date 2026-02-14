import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from 'database/entities/base.entity';
import { UserEmail } from '../value-objects/user-email.vo';
import { UserName } from '../value-objects/user-name.vo';
import { UserPassword } from '../value-objects/user-password.vo';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { InactiveEntityException } from 'src/shared/exceptions/inactive-entity.exception';

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

  changeEmail(newEmail: UserEmail): void {
    const currentEmail = UserEmail.create(this.email);

    if (newEmail.equals(currentEmail)) {
      return;
    }

    this.email = newEmail.getValue();
    this.updatedAt = new Date();
  }

  changeName(newName: UserName): void {
    const currentName = UserName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changePassword(newPassword: UserPassword): void {
    const currentPassword = UserPassword.createFromHash(this.password);

    if (newPassword.equals(currentPassword)) {
      return;
    }

    this.password = newPassword.getValue();
    this.updatedAt = new Date();
  }

  changeRole(newRole: RoleEntity): void {
    this.role = newRole;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.status = StatusEnum.ATIVO;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = StatusEnum.INATIVO;
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.status === StatusEnum.ATIVO;
  }

  ensureIsActive(): void {
    if (!this.isActive()) {
      throw new InactiveEntityException('Usuário está inativo');
    }
  }
}
