import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { TCreateTaskBody, TTaskParams, TUpdateTaskBody, TUserTasksBody } from './tasks.types';
import { IDefaultResponse, ILocals } from '../../common/types';
import { tasksService } from './tasks.service';

export const createTask = async (
	req: Request<{}, {}, TCreateTaskBody>,
	res: Response<IDefaultResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		await tasksService.createTask(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
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

// export const updateTaskTime = async (
// 	req: Request<TTaskParams, {}, TUpdateTaskTimeBody>,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	try {
// 		const result = await tasksService.updateTaskTime(req.body, req.params.uuid, res.locals.user.id);
//
// 		res.status(RESPONSE_STATUSES.success).json(result ?? { success: true });
// 	} catch (e) {
// 		next(e);
// 	}
// };
