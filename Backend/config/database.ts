import { PoolOptions } from 'mysql2/promise';

export const dbConfig: PoolOptions = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'puppypassword',
  database: process.env.DB_NAME || 'mydb',
  port: 3306
};
