import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('seed_history', {
  comment: 'Tabela para controle de execução de seeds',
})
export class SeedHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: 'Nome da seed executada' })
  name: string;

  @CreateDateColumn({
    name: 'executed_at',
    type: 'timestamptz',
    comment: 'Data de execução da seed',
  })
  executedAt: Date;
}
