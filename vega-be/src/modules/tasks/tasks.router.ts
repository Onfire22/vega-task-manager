import { Router } from 'express';
import { ROUTES } from '../../constants';
import { createTask, updateTaskTime, getTaskByUuid, getUserTasks, updateTask } from './tasks.controller';
import { validateMiddleware } from '../../common/middlewares';
import {
	CreateTaskBodySchema,
	TaskParamsSchema,
	UpdateTaskBodySchema,
	UpdateTaskTimeBodySchema,
	UserTasksBodySchema,
} from './tasks.validation';

const tasksRouter = Router();

tasksRouter.post(ROUTES.createTask, validateMiddleware(CreateTaskBodySchema), createTask);
tasksRouter.patch(
	ROUTES.task,
	[validateMiddleware(TaskParamsSchema, 'params'), validateMiddleware(UpdateTaskBodySchema)],
	updateTask,
);
tasksRouter.post(ROUTES.tasks, validateMiddleware(UserTasksBodySchema), getUserTasks);
tasksRouter.get(ROUTES.task, validateMiddleware(TaskParamsSchema, 'params'), getTaskByUuid);
tasksRouter.post(
	ROUTES.estimateTask,
	[validateMiddleware(TaskParamsSchema, 'params'), validateMiddleware(UpdateTaskTimeBodySchema)],
	updateTaskTime,
);

export { tasksRouter };
