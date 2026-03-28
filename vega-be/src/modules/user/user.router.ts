import { Router } from 'express';
import { getCurrentUser, getUserList, updateUser, updateUserPassword } from './user.controller';
import { ROUTES } from '../../constants';

const userRouter = Router();

userRouter.get(ROUTES.currentUser, getCurrentUser);
userRouter.post(ROUTES.users, getUserList);
userRouter.post(ROUTES.currentUser, updateUser);
userRouter.post(ROUTES.currentUserPassword, updateUserPassword);

export { userRouter };
