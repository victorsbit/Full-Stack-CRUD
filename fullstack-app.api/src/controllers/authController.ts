import { Request, Response } from 'express';
import authService from '../services/authService';

const loginRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await authService.loginRequest(req.body);

    if (result) return res.status(result.responseCode).send({ success: result.success, message: result.message });
  } catch (error) {
    console.log(error);
  }
};

const signUpRequest = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await authService.signUpRequest(req.body);

    if (result) return res.status(result.responseCode).send({ success: result.success, message: result.message });
  } catch (error) {
    console.log(error);
  }
};

export default { loginRequest, signUpRequest };
