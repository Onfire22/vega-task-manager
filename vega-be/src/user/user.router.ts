import { Router } from 'express';
import { getCurrentUser } from './user.controller';

const userRouter = Router();

userRouter.get('/current', getCurrentUser);

export { userRouter };
