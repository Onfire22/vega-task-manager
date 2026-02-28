import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getTaskByUuid, getUserTasks, updateTask, updateTaskStatus } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.post(ROUTES.updateTask, updateTask);
tasksRouter.post(ROUTES.tasks, getUserTasks);
tasksRouter.get(ROUTES.task, getTaskByUuid);
tasksRouter.patch(ROUTES.updateTaskStatus, updateTaskStatus);

export { tasksRouter };
