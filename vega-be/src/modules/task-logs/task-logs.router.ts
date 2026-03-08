import { Router } from 'express';
import { createTaskLog } from './task-logs.controller';
import { ROUTES } from '../../constants';

const taskLogsRouter = Router();

taskLogsRouter.post(ROUTES.createTaskLog, createTaskLog);

export { taskLogsRouter };
