import { createPool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const seedQuery = fs.readFileSync(path.resolve(__dirname, './seed.sql'), {
  encoding: 'utf-8',
});

export const connection = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_LOCAL_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

console.log('Running SQL seed...');
connection.query(seedQuery);
