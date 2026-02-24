import { Router } from 'express';
import { getCurrentUser } from './user.controller';
import { ROUTES } from '../../constants';

const userRouter = Router();

userRouter.get(ROUTES.currentUser, getCurrentUser);

export { userRouter };
