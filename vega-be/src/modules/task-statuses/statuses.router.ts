import { Router } from 'express';
import { getTaskStatusesList } from './statuses.controller';

const taskStatusesRouter = Router();

taskStatusesRouter.get('/', getTaskStatusesList);

export { taskStatusesRouter };
