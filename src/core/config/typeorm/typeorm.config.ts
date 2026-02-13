import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envConfig } from '../env/env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  schema: envConfig.DB_SCHEMA,
  ssl: envConfig.DB_SSL,
  autoLoadEntities: true,
  synchronize: false,
};
