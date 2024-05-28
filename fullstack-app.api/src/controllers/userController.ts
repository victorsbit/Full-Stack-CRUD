import { Request, Response } from 'express';
import userService from '../services/userService';
import authService from '../services/authService';

const getAllUsers = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.getAllUsers();

    return res.status(200).send(result);
  } catch (error) {}
};

const getUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.getUser(req.params.id);

    return res.status(200).send(result);
  } catch (error) {}
};

const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await authService.signUpRequest(req.body);

    if (result) return res.status(result.responseCode).send({ success: result.success, message: result.message });
  } catch (error) {}
};

const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.updateUser(req.body, req.params.id);

    if (result) return res.status(result.responseCode).send({ success: result.success, message: result.message });
  } catch (error) {}
};

const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.deleteUser(req.params.id);

    return res.status(200).send(result);
  } catch (error) {}
};

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
