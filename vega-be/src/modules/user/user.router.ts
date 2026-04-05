import { Router } from 'express';
import { getCurrentUser, getUserList, updateUser, updateUserPassword } from './user.controller';
import { ROUTES } from '../../common/constants';
import { validateMiddleware } from '../../common/middlewares';
import { UpdateUserBodySchema, UpdateUserPasswordBodySchema, UserListBodySchema } from './user.validation';

const userRouter = Router();

userRouter.get(ROUTES.currentUser, getCurrentUser);
userRouter.post(ROUTES.users, validateMiddleware(UserListBodySchema), getUserList);
userRouter.post(ROUTES.currentUser, validateMiddleware(UpdateUserBodySchema), updateUser);
userRouter.post(ROUTES.currentUserPassword, validateMiddleware(UpdateUserPasswordBodySchema), updateUserPassword);

export { userRouter };
