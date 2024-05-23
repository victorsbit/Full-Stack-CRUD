import { Router } from 'express';
import userRouter from './userRoute';

const routes = Router();
routes.use('/users', userRouter);

export default routes;
