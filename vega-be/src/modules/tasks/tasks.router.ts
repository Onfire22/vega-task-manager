import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getTaskByUuid, getUserTasks } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.get(ROUTES.tasks, getUserTasks);
tasksRouter.get(ROUTES.task, getTaskByUuid);

export { tasksRouter };
