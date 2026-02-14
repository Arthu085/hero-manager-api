import { DataSource, Repository } from 'typeorm';
import AppDataSource from '../data-source';
import { SeedHistoryEntity } from '../entities/seed-history.entity';
import { Seed } from './interfaces/seed.interface';
import { RoleSeed } from './data/role.seed';
import { UserSeed } from './data/user.seed';

class SeedRunner {
  private dataSource: DataSource;
  private seedHistoryRepository: Repository<SeedHistoryEntity>;

  async initialize() {
    this.dataSource = AppDataSource;
    await this.dataSource.initialize();
    console.log('Conexão com banco de dados estabelecida\n');

    this.seedHistoryRepository =
      this.dataSource.getRepository(SeedHistoryEntity);
  }

  async runSeed(seed: Seed): Promise<void> {
    const hasRun = await this.seedHistoryRepository.findOne({
      where: { name: seed.name },
    });

    if (hasRun) {
      console.log(
        `${seed.name} já foi executada em ${hasRun.executedAt.toLocaleString('pt-BR')}\n`,
      );
      return;
    }

    console.log(`Executando ${seed.name}...`);
    await seed.run();

    const history = this.seedHistoryRepository.create({ name: seed.name });
    await this.seedHistoryRepository.save(history);
    console.log(`${seed.name} executada com sucesso!\n`);
  }

  async run() {
    try {
      await this.initialize();

      console.log('Iniciando execução das seeds...\n');

      const seeds: Seed[] = [
        new RoleSeed(this.dataSource),
        new UserSeed(this.dataSource),
      ];

      for (const seed of seeds) {
        await this.runSeed(seed);
      }

      console.log('Todas as seeds foram processadas com sucesso!');
    } catch (error) {
      console.error('Erro ao executar seeds:', error);
      process.exit(1);
    } finally {
      await this.dataSource.destroy();
      console.log('Conexão com banco de dados encerrada');
    }
  }
}

const seedRunner = new SeedRunner();
seedRunner.run();
