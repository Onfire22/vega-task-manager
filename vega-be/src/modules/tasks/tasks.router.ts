import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, getTaskByUuid, getUserTasks, updateTask } from './tasks.controller';
import { validateMiddleware } from '../../common/middlewares';
import { CreateTaskBodySchema, TaskParamsSchema, UpdateTaskBodySchema, UserTasksBodySchema } from './tasks.validation';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, validateMiddleware(CreateTaskBodySchema), createTask);
tasksRouter.patch(
	ROUTES.task,
	[validateMiddleware(TaskParamsSchema, 'params'), validateMiddleware(UpdateTaskBodySchema)],
	updateTask,
);
tasksRouter.post(ROUTES.tasks, validateMiddleware(UserTasksBodySchema), getUserTasks);
tasksRouter.get(ROUTES.task, validateMiddleware(TaskParamsSchema, 'params'), getTaskByUuid);

export { tasksRouter };
