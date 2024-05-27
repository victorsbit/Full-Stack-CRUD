import { ResultSetHeader } from 'mysql2';
import { connection } from '../config/db';
import { signUpRequest } from '../interfaces/auth';
import { User, UserDTO } from '../interfaces/user';

const getAllUsers = async (): Promise<User[] | void> => {
  try {
    const query = 'SELECT * FROM User';
    const [rows] = await connection.query<User[]>(query);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const query = 'SELECT * FROM User WHERE ID = ?';
    const [rows] = await connection.query<User[]>(query, id);

    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const query = 'SELECT * FROM User WHERE Email = ?';
    const [rows] = await connection.query<User[]>(query, email);

    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user: UserDTO, id: string | number) => {
  try {
    const query = 'UPDATE User SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE ID = ?';
    const [rows] = await connection.execute<ResultSetHeader>(query, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      id,
    ]);

    console.log(rows.affectedRows);

    return rows.affectedRows;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id: string): Promise<User | undefined> => {
  try {
    const query = 'DELETE FROM User WHERE ID = ?';
    const [rows] = await connection.query<User[]>(query, id);

    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

export default { getAllUsers, getUser, getUserByEmail, updateUser, deleteUser };
