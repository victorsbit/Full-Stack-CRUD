import { BaseResponse } from '@/interfaces/common';
import { User } from '@/interfaces/user';
import api from '../api';
import { SignUpRequest } from '@/interfaces/auth';

export async function getAllUsers(): Promise<User[] | void> {
  try {
    const response = await api.get<BaseResponse<User[]>>('/user');

    return response.data.data;
  } catch (error) {}
}

export async function getUser(id: string | number): Promise<User[] | void> {
  try {
    const response = await api.get<BaseResponse<User[]>>(`/user/:${id}`);

    return response.data.data;
  } catch (error) {}
}

export const createUser = async (newUser: SignUpRequest): Promise<BaseResponse<undefined> | void> => {
  try {
    const response = await api.post<BaseResponse<undefined>>('/user', newUser);

    return response.data.data;
  } catch (error) {}
};

export const updateUser = async (newUser: SignUpRequest): Promise<BaseResponse<undefined> | void> => {
  try {
    const response = await api.put<BaseResponse<undefined>>('/user', newUser);

    return response.data.data;
  } catch (error) {}
};
