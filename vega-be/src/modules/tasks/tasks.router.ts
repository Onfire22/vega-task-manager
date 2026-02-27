import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getTaskByUuid, getUserTasks, updateTask } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.post(ROUTES.updateTask, updateTask);
tasksRouter.get(ROUTES.tasks, getUserTasks);
tasksRouter.get(ROUTES.task, getTaskByUuid);

export { tasksRouter };
