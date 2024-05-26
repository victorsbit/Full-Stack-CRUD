import { AuthLoginRequest, signUpRequest } from '../interfaces/auth';
import { BaseResponse } from '../interfaces/common';
import authModel from '../models/authModel';
import userModel from '../models/userModel';

const loginRequest = async (requestBody: AuthLoginRequest): Promise<BaseResponse<undefined> | void> => {
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

const signUpRequest = async (requestBody: signUpRequest): Promise<BaseResponse<number> | void> => {
  try {
    const userResult = await userModel.getUser(requestBody.email);
    if (userResult) return { responseCode: 400, success: false, message: 'Usuário já cadastrado no sistema' };

    const result = await authModel.signUpRequest(requestBody);

    if (result) return { responseCode: 201, success: true, message: 'Usuário criado com sucesso', data: result };
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest, signUpRequest };
