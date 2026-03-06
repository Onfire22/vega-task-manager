import { Router } from 'express';
import { getUserByEmail, logOutUser, signInUser, signupUser } from './auth.controller';
import { ROUTES } from '../../constants';

const authRouter = Router();

authRouter.post(ROUTES.signUp, signupUser);
authRouter.post(ROUTES.signIn, signInUser);
authRouter.post(ROUTES.userByEmail, getUserByEmail);
authRouter.post(ROUTES.logout, logOutUser);

export { authRouter };
