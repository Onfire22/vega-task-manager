import { Router } from 'express';
import { ROUTES } from '../../constants';
import { updateTaskTime } from './task-logs.controller';

const taskLogsRouter = Router();

taskLogsRouter.post(ROUTES.createTaskLog, updateTaskTime);

export { taskLogsRouter };
