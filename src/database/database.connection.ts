import { DataSourceOptions } from 'typeorm';
import { Users } from '../entities/users_entities/users.entity';
import { AuthSessionUser } from 'src/entities/auth_entities/auth.session.entity';
import { Logs } from 'src/entities/logs_entities/logs.entity';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Users, AuthSessionUser, Logs, Roles, Customers],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
};

export default typeOrmConfig;