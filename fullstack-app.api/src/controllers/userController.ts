import { Request, Response } from 'express';
import userService from '../services/userService';

const getAll = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.getAll();

    return res.status(200).send(result);
  } catch (error) {}
};

const getUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await userService.getUser(req.body);

    return res.status(200).send(result);
  } catch (error) {}
};

export default { getAll, getUser };
