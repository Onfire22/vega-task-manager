import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask } from './tasks.controller';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, createTask);

export { tasksRouter };
