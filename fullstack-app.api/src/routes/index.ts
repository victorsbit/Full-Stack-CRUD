import { Router } from 'express';
import authRouter from './authRoute';
import userRouter from './userRoute';
import { checkToken } from '../middlewares/authMiddleware';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', checkToken, userRouter);

export default routes;
