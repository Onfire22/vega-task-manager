import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { createTaskLogController, getTaskLogsController } from './task-logs.controller';
import { validateMiddleware } from '../../common/middlewares';
import { CreateTaskTimeBodySchema, getTaskLogsPramsSchema } from './task-logs.validation';

const taskLogsRouter = Router();

taskLogsRouter.post(ROUTES.createTaskLog, validateMiddleware(CreateTaskTimeBodySchema), createTaskLogController);
taskLogsRouter.get(ROUTES.getTaskLogs, validateMiddleware(getTaskLogsPramsSchema, 'params'), getTaskLogsController);

export { taskLogsRouter };
