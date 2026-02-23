import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getUserTasks } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);
tasksRouter.post(ROUTES.getTasks, getUserTasks);

export { tasksRouter };
