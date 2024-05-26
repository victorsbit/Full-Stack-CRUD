import { ResultSetHeader } from 'mysql2';
import { connection } from '../config/db';
import { signUpRequest } from '../interfaces/auth';
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

const signUpRequest = async (requestBody: signUpRequest): Promise<number | void> => {
  try {
    const query = 'INSERT INTO User (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)';
    const [rows] = await connection.execute<ResultSetHeader>(query, [
      requestBody.firstName,
      requestBody.lastName,
      requestBody.email,
      requestBody.password,
    ]);

    return rows.affectedRows;
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest, signUpRequest };
