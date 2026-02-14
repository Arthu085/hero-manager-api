import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../src/core/config/typeorm/typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../database/entities/*.entity{.ts,.js}',
    __dirname + '/../src/modules/**/domain/entities/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
