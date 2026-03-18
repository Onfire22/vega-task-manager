import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { ROUTES } from '../constants';
import { tasksRouter } from '../modules/tasks/tasks.router';
import { projectsRouter } from '../modules/projects/projects.router';
import { taskLogsRouter } from '../modules/task-logs/task-logs.router';
import { membershipsRouter } from '../modules/memberships/memberships.router';

const protectedRouter = Router();

protectedRouter.use(ROUTES.root, userRouter);
protectedRouter.use(ROUTES.root, tasksRouter);
protectedRouter.use(ROUTES.root, projectsRouter);
protectedRouter.use(ROUTES.root, taskLogsRouter);
protectedRouter.use(ROUTES.root, membershipsRouter);

export { protectedRouter };
