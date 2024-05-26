import { connection } from '../config/db';
import { User } from '../interfaces/user';

const getAll = async (): Promise<User[] | void> => {
  try {
    const query = 'SELECT * FROM User';
    const [rows] = await connection.query<User[]>(query);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (email: string): Promise<User | void> => {
  try {
    const query = 'SELECT * FROM User WHERE Email = ?';
    const [rows] = await connection.query<User[]>(query, email);

    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, getUser };
