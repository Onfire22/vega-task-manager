import { Router } from 'express';
import { logOutUser, signInUser, signupUser } from './auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', signupUser);
authRouter.post('/sign-in', signInUser);
authRouter.post('/logout', logOutUser);

export { authRouter };
