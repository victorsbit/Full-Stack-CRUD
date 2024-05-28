import { SignUpRequest } from '@/interfaces/auth';
import api from '../api';
import { BaseResponse } from '../../interfaces/common';

export const signUp = async (newUser: SignUpRequest): Promise<BaseResponse<unknown> | void> => {
  try {
    const response = await api.post<BaseResponse<unknown>>('/user', newUser);

    return response.data;
  } catch (error) {}
};
