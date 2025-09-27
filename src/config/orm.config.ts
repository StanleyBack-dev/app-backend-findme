import { DataSourceOptions } from 'typeorm';
import { Users } from '../entities/users/users.entity';
import { AuthSessionUser } from 'src/entities/auth/auth.session.entity';
import { Logs } from 'src/entities/logs/logs.entity';
import { Customers } from 'src/entities/customers/customers.entity';
import { Roles } from 'src/entities/roles/roles.entity';
import { AuthCodes } from 'src/entities/auth_codes/auth.codes.entity';
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
  entities: [Users, AuthSessionUser, Logs, Customers, Roles, AuthCodes],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
};

export default typeOrmConfig;