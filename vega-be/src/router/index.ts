import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { stackRouter } from '../modules/stack/stack.router';
import { prioritiesRouter } from '../modules/task-priorities/priorities.router';
import { ROUTES } from '../constants';
import { tasksRouter } from '../modules/tasks/tasks.router';

const protectedRouter = Router();

protectedRouter.use(ROUTES.users, userRouter);
protectedRouter.use(ROUTES.priorities, prioritiesRouter);
protectedRouter.use(ROUTES.stack, stackRouter);
protectedRouter.use(ROUTES.tasks, tasksRouter);

export { protectedRouter };
