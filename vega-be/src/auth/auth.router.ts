import { Router } from 'express';
import { signInUser, signupUser } from './auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', signupUser);
authRouter.post('/sign-in', signInUser);

export { authRouter };
