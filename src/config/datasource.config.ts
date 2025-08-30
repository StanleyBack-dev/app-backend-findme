import 'reflect-metadata';
import { DataSource } from 'typeorm';
import typeOrmConfig from './orm.config';

export const AppDataSource = new DataSource(typeOrmConfig);