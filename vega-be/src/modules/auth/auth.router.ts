import { Router } from 'express';
import { getUserByEmail, logOutUser, signInUser, signupUser } from './auth.controller';
import { ROUTES } from '../../constants';
import { validateMiddleware } from '../../common/middlewares';
import { SignInBodySchema, SignUpBodySchema, UserByEmailBodySchema } from './auth.validation';

const authRouter = Router();

authRouter.post(ROUTES.signUp, validateMiddleware(SignUpBodySchema), signupUser);
authRouter.post(ROUTES.signIn, validateMiddleware(SignInBodySchema), signInUser);
authRouter.post(ROUTES.userByEmail, validateMiddleware(UserByEmailBodySchema), getUserByEmail);
authRouter.post(ROUTES.logout, logOutUser);

export { authRouter };
