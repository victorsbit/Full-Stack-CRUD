import { AuthLoginRequest, signUpRequest } from '../interfaces/auth';
import { BaseResponse } from '../interfaces/common';
import authModel from '../models/authModel';
import userModel from '../models/userModel';
import jsonwebtoken from 'jsonwebtoken';

import Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(20).required().messages({
    'string.empty': 'O campo nome é obrigatório',
    'string.min': 'O nome precisa conter ao menos 3 caracteres',
    'string.max': 'O nome pode conter no máximo 20 caracteres',
  }),
  lastName: Joi.string().alphanum().min(3).max(20).required().messages({
    'string.empty': 'O campo sobrenome é obrigatório',
    'string.min': 'O sobrenome precisa conter ao menos 3 caracteres',
    'string.max': 'O sobrenome pode conter no máximo 20 caracteres',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    'string.empty': 'O campo e-mail é obrigatório',
    'string.email': 'Por favor, insira um endereço de e-mail válido',
  }),
  password: Joi.string().min(3).max(20).messages({
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter ao menos 3 caracteres',
    'string.max': 'A senha precisa conter no máximo 20 caracteres',
  }),
});

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

const signUpRequest = async (requestBody: signUpRequest): Promise<BaseResponse<any> | void> => {
  try {
    const userResult = await userModel.getUserByEmail(requestBody.email);
    if (userResult) return { responseCode: 400, success: false, message: 'Usuário já cadastrado no sistema' };

    const { error } = schema.validate(requestBody);
    if (error) return { responseCode: 400, success: false, message: error.message };

    const result = await authModel.signUpRequest(requestBody);

    if (result) return { responseCode: 201, success: true, message: 'Usuário criado com sucesso', data: result };
    return { responseCode: 201, success: true, message: 'Usuário criado com sucesso' };
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest, signUpRequest };
