import { Router } from 'express';
import {
	getUserByEmailController,
	logOutUserController,
	refreshTokenController,
	signInUserController,
	signupUserController,
} from './auth.controller';
import { ROUTES } from '../../router/routes';
import { validateMiddleware } from '../../common/middlewares';
import { SignInBodySchema, SignUpBodySchema, UserByEmailBodySchema } from './auth.validation';

const authRouter = Router();

authRouter.post(ROUTES.signUp, validateMiddleware(SignUpBodySchema), signupUserController);
authRouter.post(ROUTES.signIn, validateMiddleware(SignInBodySchema), signInUserController);
authRouter.post(ROUTES.userByEmail, validateMiddleware(UserByEmailBodySchema), getUserByEmailController);
authRouter.post(ROUTES.refresh, refreshTokenController);
authRouter.post(ROUTES.logout, logOutUserController);

export { authRouter };
