import { Router } from 'express';
import { getUserByEmail, logOutUser, refreshToken, signInUser, signupUser } from './auth.controller';
import { ROUTES } from '../../common/constants';
import { validateMiddleware } from '../../common/middlewares';
import { SignInBodySchema, SignUpBodySchema, UserByEmailBodySchema } from './auth.validation';

const authRouter = Router();

authRouter.post(ROUTES.signUp, validateMiddleware(SignUpBodySchema), signupUser);
authRouter.post(ROUTES.signIn, validateMiddleware(SignInBodySchema), signInUser);
authRouter.post(ROUTES.userByEmail, validateMiddleware(UserByEmailBodySchema), getUserByEmail);
authRouter.post(ROUTES.refresh, refreshToken);
authRouter.post(ROUTES.logout, logOutUser);

export { authRouter };
