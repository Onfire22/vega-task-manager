import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { stackRouter } from '../modules/stack/stack.router';
import { prioritiesRouter } from '../modules/task-priorities/priorities.router';

const protectedRouter = Router();

protectedRouter.use('/users', userRouter);
protectedRouter.use('/priorities', prioritiesRouter);
protectedRouter.use('/stack', stackRouter);

export { protectedRouter };
