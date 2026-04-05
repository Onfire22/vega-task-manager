import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { createTaskLog, getTaskLogs } from './task-logs.controller';
import { validateMiddleware } from '../../common/middlewares';
import { CreateTaskTimeBodySchema, getTaskLogsPramsSchema } from './task-logs.validation';

const taskLogsRouter = Router();

taskLogsRouter.post(ROUTES.createTaskLog, validateMiddleware(CreateTaskTimeBodySchema), createTaskLog);
taskLogsRouter.get(ROUTES.getTaskLogs, validateMiddleware(getTaskLogsPramsSchema, 'params'), getTaskLogs);

export { taskLogsRouter };
