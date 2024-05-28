import { BaseResponse } from '../interfaces/common';
import { User, UserDTO } from '../interfaces/user';
import userModel from '../models/userModel';
import { toCamel } from '../utils';

const checkExistingUser = async (id: string | number): Promise<User | undefined> => {
  try {
    const result = await userModel.getUser(String(id));

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (): Promise<BaseResponse<UserDTO[] | undefined> | void> => {
  try {
    const result = await userModel.getAllUsers();

    if (Array.isArray(result)) {
      return { responseCode: 200, success: true, data: toCamel(result) };
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (id: string | number): Promise<BaseResponse<UserDTO | undefined> | void> => {
  try {
    const result = await checkExistingUser(id);

    if (!result) return { responseCode: 404, success: false, message: 'Usuário não encontrado' };

    return { responseCode: 200, success: true, data: toCamel(result) };
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user: UserDTO, id: string | number) => {
  try {
    const doesUserExist = await checkExistingUser(id);
    if (!doesUserExist) return { responseCode: 404, success: false, message: 'Usuário não encontrado' };

    const result = await userModel.updateUser(user, id);
    if (!result) return { responseCode: 400, success: false, message: 'Ocorreu um problema ao atualizar o usuário' };

    return { responseCode: 200, success: true, message: 'Usuário atualizado com sucesso' };
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id: string | number): Promise<BaseResponse<undefined> | void> => {
  try {
    const doesUserExist = await checkExistingUser(id);

    if (!doesUserExist) return { responseCode: 404, success: false, message: 'Usuário não encontrado' };

    const result = await userModel.deleteUser(String(id));

    return { responseCode: 200, success: true };
  } catch (error) {
    console.log(error);
  }
};

export default { getAllUsers, getUser, updateUser, deleteUser };
