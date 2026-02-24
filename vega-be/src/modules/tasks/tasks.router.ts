import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getUserTasks } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.get(ROUTES.tasks, getUserTasks);

export { tasksRouter };
