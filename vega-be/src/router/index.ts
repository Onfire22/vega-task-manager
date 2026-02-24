import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { ROUTES } from '../constants';
import { tasksRouter } from '../modules/tasks/tasks.router';
import { dictionaryRouter } from '../modules/dictionary/dictionary.router';

const protectedRouter = Router();

protectedRouter.use(ROUTES.root, userRouter);
protectedRouter.use(ROUTES.root, tasksRouter);
protectedRouter.use(ROUTES.root, dictionaryRouter);

export { protectedRouter };
