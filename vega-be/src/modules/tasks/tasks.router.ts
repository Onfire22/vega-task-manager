import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, updateTaskTime, getTaskByUuid, getUserTasks, updateTask } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.patch(ROUTES.task, updateTask);
tasksRouter.post(ROUTES.tasks, getUserTasks);
tasksRouter.get(ROUTES.task, getTaskByUuid);
tasksRouter.post(ROUTES.estimateTask, updateTaskTime);

export { tasksRouter };
