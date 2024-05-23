import { createPool } from 'mysql2/promise';

export const connection = createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'test_db',
});
