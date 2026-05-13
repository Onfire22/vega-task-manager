import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { ROUTES } from '../common/constants';
import { tasksRouter } from '../modules/tasks/tasks.router';
import { projectsRouter } from '../modules/projects/projects.router';
import { taskLogsRouter } from '../modules/task-logs/task-logs.router';
import { membershipsRouter } from '../modules/memberships/memberships.router';
import { commentsRouter } from '../modules/comments/comments.router';
import { notificationsRouter } from '../modules/notifications/notifications.router';
import { channelsRouter } from '../modules/channels/channels.router';
import { messagesRouter } from '../modules/messages/messages.router';
import { globalSearchRouter } from '../modules/glogal-search/global-search.router';
import { filesRouter } from '../modules/files/files.router';

const protectedRouter = Router();

protectedRouter.use(ROUTES.root, userRouter);
protectedRouter.use(ROUTES.root, tasksRouter);
protectedRouter.use(ROUTES.root, projectsRouter);
protectedRouter.use(ROUTES.root, taskLogsRouter);
protectedRouter.use(ROUTES.root, membershipsRouter);
protectedRouter.use(ROUTES.root, commentsRouter);
protectedRouter.use(ROUTES.root, notificationsRouter);
protectedRouter.use(ROUTES.root, channelsRouter);
protectedRouter.use(ROUTES.root, messagesRouter);
protectedRouter.use(ROUTES.root, globalSearchRouter);
protectedRouter.use(ROUTES.root, filesRouter);

export { protectedRouter };
