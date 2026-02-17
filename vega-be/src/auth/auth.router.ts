import { Router } from 'express';
import { createUser } from './auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', createUser);

export { authRouter };
