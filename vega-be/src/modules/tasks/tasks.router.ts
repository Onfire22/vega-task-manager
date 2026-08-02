import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import {
	createTaskController,
	getTaskByUuidController,
	getUserTasksController,
	updateTaskController,
	updateTaskEstimateController,
} from './tasks.controller';
import { validateMiddleware } from '../../common/middlewares';
import {
	CreateTaskBodySchema,
	TaskParamsSchema,
	UpdateTaskBodySchema,
	UpdateTaskEstimateSchema,
	UserTasksBodySchema,
} from './tasks.validation';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, validateMiddleware(CreateTaskBodySchema), createTaskController);
tasksRouter.patch(
	ROUTES.task,
	[validateMiddleware(TaskParamsSchema, 'params'), validateMiddleware(UpdateTaskBodySchema)],
	updateTaskController,
);
tasksRouter.post(ROUTES.tasks, validateMiddleware(UserTasksBodySchema), getUserTasksController);
tasksRouter.get(ROUTES.task, validateMiddleware(TaskParamsSchema, 'params'), getTaskByUuidController);
tasksRouter.post(ROUTES.updateTaskEstimate, validateMiddleware(UpdateTaskEstimateSchema), updateTaskEstimateController);

export { tasksRouter };
