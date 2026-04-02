import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { TCreateTaskBody, TTaskParams, TUpdateTaskBody, TUpdateTaskEstimate, TUserTasksBody } from './tasks.types';
import { tasksService } from './tasks.service';
import { transformTimeToSeconds } from '../../common/utils';

export const createTask = async (req: Request<{}, {}, TCreateTaskBody>, res: Response, next: NextFunction) => {
	try {
		const task = await tasksService.createTask(req.body, res.locals.user.id);

		console.log(task);

		res.status(RESPONSE_STATUSES.success).json({ id: task.id });
	} catch (e) {
		next(e);
	}
};

export const getUserTasks = async (req: Request<{}, {}, TUserTasksBody>, res: Response, next: NextFunction) => {
	try {
		const tasks = await tasksService.getUserTasks(req.body, res.locals.user.id);

		res.status(200).json({ tasks });
	} catch (e) {
		next(e);
	}
};

export const getTaskByUuid = async (req: Request<TTaskParams>, res: Response, next: NextFunction) => {
	try {
		const task = await tasksService.getTaskByUuid(req.params.uuid);

		return res.status(200).json({ task });
	} catch (e) {
		next(e);
	}
};

export const updateTask = async (req: Request<TTaskParams, {}, TUpdateTaskBody>, res: Response, next: NextFunction) => {
	try {
		const task = await tasksService.updateTask(req.body, req.params.uuid);

		res.status(200).json({ task });
	} catch (e) {
		next(e);
	}
};

export const updateTaskEstimate = async (
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
