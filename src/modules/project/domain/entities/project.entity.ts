import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { BaseEntity } from 'database/entities/base.entity';
import { ProjectStatus } from '../enums/project-status.enum';
import { ProjectName } from '../value-objects/project-name.vo';
import { ProjectDescription } from '../value-objects/project-description.vo';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { InactiveEntityException } from 'src/shared/exceptions/inactive-entity.exception';
import { ProjectAgility } from '../value-objects/project-agility.vo';
import { ProjectEnchantment } from '../value-objects/project-enchantment.vo';
import { ProjectEfficiency } from '../value-objects/project-efficiency.vo';
import { ProjectExcellence } from '../value-objects/project-excellence.vo';
import { ProjectTransparency } from '../value-objects/project-transparency.vo';
import { ProjectAmbition } from '../value-objects/project-ambition.vo';
import { ProjectCompletionPercentage } from '../value-objects/project-completion-percentage.vo';

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

  changeUser(newUser: UserEntity): void {
    if (this.user && this.user.id === newUser.id) {
      return;
    }

    this.user = newUser;
    this.updatedAt = new Date();
  }

  changeName(newName: ProjectName): void {
    const currentName = ProjectName.create(this.name);

    if (newName.equals(currentName)) {
      return;
    }

    this.name = newName.getValue();
    this.updatedAt = new Date();
  }

  changeDescription(newDescription: ProjectDescription): void {
    const currentDescription = ProjectDescription.create(this.description);

    if (newDescription.equals(currentDescription)) {
      return;
    }

    this.description = newDescription.getValue();
    this.updatedAt = new Date();
  }

  changeAgility(newAgility: ProjectAgility): void {
    const currentAgility = ProjectAgility.create(this.agility);

    if (newAgility.equals(currentAgility)) {
      return;
    }

    this.agility = newAgility.getValue();
    this.updateProgressAutomatically();
  }

  changeEnchantment(newEnchantment: ProjectEnchantment): void {
    const currentEnchantment = ProjectEnchantment.create(this.enchantment);

    if (newEnchantment.equals(currentEnchantment)) {
      return;
    }

    this.enchantment = newEnchantment.getValue();
    this.updateProgressAutomatically();
  }

  changeEfficiency(newEfficiency: ProjectEfficiency): void {
    const currentEfficiency = ProjectEfficiency.create(this.efficiency);

    if (newEfficiency.equals(currentEfficiency)) {
      return;
    }

    this.efficiency = newEfficiency.getValue();
    this.updateProgressAutomatically();
  }

  changeExcellence(newExcellence: ProjectExcellence): void {
    const currentExcellence = ProjectExcellence.create(this.excellence);

    if (newExcellence.equals(currentExcellence)) {
      return;
    }

    this.excellence = newExcellence.getValue();
    this.updateProgressAutomatically();
  }

  changeTransparency(newTransparency: ProjectTransparency): void {
    const currentTransparency = ProjectTransparency.create(this.transparency);

    if (newTransparency.equals(currentTransparency)) {
      return;
    }

    this.transparency = newTransparency.getValue();
    this.updateProgressAutomatically();
  }

  changeAmbition(newAmbition: ProjectAmbition): void {
    const currentAmbition = ProjectAmbition.create(this.ambition);

    if (newAmbition.equals(currentAmbition)) {
      return;
    }

    this.ambition = newAmbition.getValue();
    this.updateProgressAutomatically();
  }

  changeCompletionPercentage(
    newCompletionPercentage: ProjectCompletionPercentage,
  ): void {
    const currentCompletionPercentage = ProjectCompletionPercentage.create(
      this.completionPercentage,
    );

    if (newCompletionPercentage.equals(currentCompletionPercentage)) {
      return;
    }

    this.completionPercentage = newCompletionPercentage.getValue();
    this.updatedAt = new Date();
  }

  calculateProgress(): number {
    const metrics = [
      this.agility,
      this.enchantment,
      this.efficiency,
      this.excellence,
      this.transparency,
      this.ambition,
    ];

    const sum = metrics.reduce((acc, metric) => acc + metric, 0);
    const average = sum / metrics.length;

    return Math.round(average * 100) / 100;
  }

  updateProgressAutomatically(): void {
    const newProgress = this.calculateProgress();
    this.completionPercentage = newProgress;
    this.updateProjectStatusBasedOnProgress();
    this.updatedAt = new Date();
  }

  updateProjectStatusBasedOnProgress(): void {
    if (this.completionPercentage === 0) {
      this.projectStatus = ProjectStatus.PENDING;
    } else if (this.completionPercentage === 100) {
      this.projectStatus = ProjectStatus.COMPLETED;
    } else {
      this.projectStatus = ProjectStatus.IN_PROGRESS;
    }
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
      throw new InactiveEntityException('O projeto está inativo');
    }
  }
}
