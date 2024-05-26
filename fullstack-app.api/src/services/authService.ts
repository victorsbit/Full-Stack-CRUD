import { AuthLogin } from '../interfaces/auth';
import { BaseResponse } from '../interfaces/common';
import authModel from '../models/authModel';

const loginRequest = async (requestBody: AuthLogin): Promise<BaseResponse<undefined> | void> => {
  try {
    const result = await authModel.loginRequest(requestBody.email);

    if (Array.isArray(result) && !result.length) {
      return { responseCode: 404, success: false, message: 'Usuário não encontrado' };
    }

    if (Array.isArray(result) && result[0].Password !== requestBody.password) {
      return { responseCode: 401, success: false, message: 'Senha incorreta' };
    }

    return { responseCode: 200, success: true, message: 'Usuário autenticado' };
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest };
