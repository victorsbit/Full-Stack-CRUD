import { Router } from 'express';
import authController from '../controllers/authController';

const authRouter = Router();
authRouter.post('/login', authController.loginRequest);
authRouter.post('/signup', authController.signUpRequest);

export default authRouter;
