import { Router } from 'express';
import authRouter from './authRoute';
import userRouter from './userRoute';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);

export default routes;
