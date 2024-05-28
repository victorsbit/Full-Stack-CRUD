import { createPool } from 'mysql2/promise';
import { seedString } from './seed';

export const connection = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_LOCAL_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

console.log('Running SQL seed...');
connection.query(seedString);
