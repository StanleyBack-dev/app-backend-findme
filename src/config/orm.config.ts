import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/users_entities/users.entity';
import { AuthSessionUser } from 'src/entities/auth_entities/auth.session.entity';
import { Logs } from 'src/entities/logs_entities/logs.entity';
import { Customers } from 'src/entities/customers_entities/customers.entity';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User, AuthSessionUser, Logs, Customers, Roles],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
};

export default typeOrmConfig;