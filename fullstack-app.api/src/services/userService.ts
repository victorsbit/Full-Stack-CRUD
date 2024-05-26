import { BaseResponse } from '../interfaces/common';
import { User } from '../interfaces/user';
import userModel from '../models/userModel';

const getAll = async (): Promise<BaseResponse<User[] | undefined> | void> => {
  try {
    const result = await userModel.getAll();

    if (Array.isArray(result)) return { responseCode: 200, success: true, data: result };
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (email: string): Promise<BaseResponse<User | undefined> | void> => {
  try {
    const result = await userModel.getUser(email);

    if (!result) return { responseCode: 404, success: false, message: 'Usuário não encontrado' };

    return { responseCode: 200, success: true };
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, getUser };
