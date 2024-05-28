import { SignInRequest, SignUpRequest } from '@/interfaces/auth';
import api from '../api';
import { BaseResponse } from '../../interfaces/common';
import { Axios, AxiosError } from 'axios';

export const signIn = async (user: SignInRequest): Promise<BaseResponse<string> | void> => {
  try {
    const response = await api.post<BaseResponse<string>>('/auth/login', user);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) return error.response?.data;
  }
};

export const signUp = async (newUser: SignUpRequest): Promise<BaseResponse<unknown> | void> => {
  try {
    const response = await api.post<BaseResponse<unknown>>('/auth/signup', newUser);

    return response.data;
  } catch (error) {}
};
