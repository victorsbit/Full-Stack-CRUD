import { connection } from '../config/db';
import { User } from '../interfaces/user';

const loginRequest = async (email: string): Promise<User[] | void> => {
  try {
    const query = 'SELECT * FROM User WHERE Email = ?';
    const [rows] = await connection.query<User[]>(query, email);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest };
