import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { TTaskParams } from '../tasks/tasks.types';
import { taskLogsSService } from './task-logs.service';
import { TUpdateTaskTimeBody } from './task-logs.types';

export const updateTaskTime = async (
	req: Request<TTaskParams, {}, TUpdateTaskTimeBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await taskLogsSService.upsertTaskLog(req.body, req.params.uuid, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json(result ?? { success: true });
	} catch (e) {
		next(e);
	}
};
