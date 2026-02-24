import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { ROUTES } from '../constants';
import { tasksRouter } from '../modules/tasks/tasks.router';

const protectedRouter = Router();

protectedRouter.use(ROUTES.users, userRouter);
protectedRouter.use(ROUTES.tasks, tasksRouter);

export { protectedRouter };
