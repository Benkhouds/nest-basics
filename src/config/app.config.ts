import { TypeOrmModuleOptions } from '@nestjs/typeorm';

enum DatabaseTypes {
  mysql = 'mysql',
  oracle = 'oracle',
  postgres = 'postgres',
  mssql = 'mssql',
  mongo = 'mongodb',
  cockroach = 'cockroachdb',
}

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    type: <DatabaseTypes>process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    autoLoadEntities: true,
    dropSchema: true,
  } as TypeOrmModuleOptions,
});
