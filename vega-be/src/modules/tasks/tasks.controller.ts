import { NextFunction, Request, Response } from 'express';
import { TCreateTaskBody, TTaskParams, TUpdateTaskBody, TUpdateTaskEstimate, TUserTasksBody } from './tasks.types';
import { tasksService } from './tasks.service';
import { transformTimeToSeconds } from '../../common/utils';
import { RESPONSE_STATUSES } from '../../common/constants';

export const createTaskController = async (
	req: Request<{}, {}, TCreateTaskBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const task = await tasksService.createTask(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ uuid: task.uuid });
	} catch (e) {
		next(e);
	}
};

export const getUserTasksController = async (
	req: Request<{}, {}, TUserTasksBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tasks = await tasksService.getUserTasks(req.body, res.locals.user.id);

		res.status(200).json(tasks);
	} catch (e) {
		next(e);
	}
};

export const getTaskByUuidController = async (req: Request<TTaskParams>, res: Response, next: NextFunction) => {
	try {
		const task = await tasksService.getTaskByUuid(req.params.uuid);

		return res.status(200).json({ task });
	} catch (e) {
		next(e);
	}
};

export const updateTaskController = async (
	req: Request<TTaskParams, {}, TUpdateTaskBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const task = await tasksService.updateTask(req.body, req.params.uuid, res.locals.user.id);

		res.status(200).json({ task: task.uuid });
	} catch (e) {
		console.log(e);
		next(e);
	}
};

export const updateTaskEstimateController = async (
	req: Request<TTaskParams, {}, TUpdateTaskEstimate>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const estimate = transformTimeToSeconds(req.body.value);

		await tasksService.updateTaskEstimate(estimate, req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
