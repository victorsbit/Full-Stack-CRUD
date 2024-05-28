import { AuthLoginRequest, signUpRequest } from '../interfaces/auth';
import { BaseResponse } from '../interfaces/common';
import authModel from '../models/authModel';
import userModel from '../models/userModel';
import jsonwebtoken from 'jsonwebtoken';

const loginRequest = async (requestBody: AuthLoginRequest): Promise<BaseResponse<string> | void> => {
  try {
    const result = await authModel.loginRequest(requestBody.email);
    if (result) {
      if (!result.length) {
        return { responseCode: 404, success: false, message: 'Usuário não encontrado' };
      }

      if (result[0].Password !== requestBody.password) {
        return { responseCode: 401, success: false, message: 'Senha incorreta' };
      }

      const token = jsonwebtoken.sign({ user: JSON.stringify(result[0]) }, process.env.JWT_PRIVATE_KEY as string, {
        expiresIn: '10m',
      });

      return { responseCode: 200, success: true, message: 'Usuário autenticado', data: token };
    }
  } catch (error) {
    console.log(error);
  }
};

const signUpRequest = async (requestBody: signUpRequest): Promise<BaseResponse<number> | void> => {
  try {
    const userResult = await userModel.getUserByEmail(requestBody.email);
    if (userResult) return { responseCode: 400, success: false, message: 'Usuário já cadastrado no sistema' };

    const result = await authModel.signUpRequest(requestBody);

    if (result) return { responseCode: 201, success: true, message: 'Usuário criado com sucesso', data: result };
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest, signUpRequest };
