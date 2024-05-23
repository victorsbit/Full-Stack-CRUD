import { Request, Response } from 'express';
import { connection } from '../config/db';

const getAll = async (req: Request, res: Response) => {
  try {
    const [rows, fields] = await connection.query('SELECT CURRENT_TIMESTAMP()');

    res.status(200).send(rows);
  } catch (error) {}
};

export default { getAll };
