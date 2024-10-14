import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.POSTGRES_USER || 'dev',
  password: process.env.POSTGRES_PASSWORD || 'devpass',
  database: process.env.POSTGRES_DB || 'dev_db',
  synchronize: false,
  logging: true,
  entities: ['src/datastructures/*/model.ts'],
  migrations: ['src/algorithms/migrations/*.ts'],
  migrationsRun: false,
  subscribers: [],
  applicationName: 'monorepo-pg',
});

export const initializeDb = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
};

export default AppDataSource;
