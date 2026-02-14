import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { BaseEntity } from 'database/entities/base.entity';
import { ProjectStatus } from '../enums/project-status.enum';

@Entity('project')
@Index(['name', 'projectStatus'])
export class ProjectEntity extends BaseEntity {
  @Column({ length: 200, comment: 'Nome do projeto' })
  @Index()
  name: string;

  @Column('text', { comment: 'Descrição do projeto' })
  description: string;

  @Column({
    type: 'enum',
    name: 'project_status',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
    comment: 'Status do projeto',
  })
  projectStatus: ProjectStatus;

  @Column({ type: 'int', default: 0, comment: 'Agilidade do projeto' })
  agility: number;

  @Column({ type: 'int', default: 0, comment: 'Encantamento do projeto' })
  enchantment: number;

  @Column({ type: 'int', default: 0, comment: 'Eficiência do projeto' })
  efficiency: number;

  @Column({ type: 'int', default: 0, comment: 'Excelência do projeto' })
  excellence: number;

  @Column({ type: 'int', default: 0, comment: 'Transparência do projeto' })
  transparency: number;

  @Column({ type: 'int', default: 0, comment: 'Ambição do projeto' })
  ambition: number;

  @Column({
    type: 'decimal',
    name: 'completion_percentage',
    precision: 5,
    scale: 2,
    default: 0,
    comment: 'Porcentagem de conclusão do projeto',
  })
  completionPercentage: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
