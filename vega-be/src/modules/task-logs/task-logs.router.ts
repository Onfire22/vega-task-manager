import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTaskLog } from './task-logs.controller';
import { validateMiddleware } from '../../common/middlewares';
import { CreateTaskTimeBodySchema } from './task-logs.validation';

const taskLogsRouter = Router();

taskLogsRouter.post(ROUTES.createTaskLog, validateMiddleware(CreateTaskTimeBodySchema), createTaskLog);

export { taskLogsRouter };
