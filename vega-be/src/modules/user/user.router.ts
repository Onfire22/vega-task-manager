import { Router } from 'express';
import { getCurrentUser, getUserList } from './user.controller';
import { ROUTES } from '../../constants';

const userRouter = Router();

userRouter.get(ROUTES.currentUser, getCurrentUser);
userRouter.get(ROUTES.users, getUserList);

export { userRouter };
