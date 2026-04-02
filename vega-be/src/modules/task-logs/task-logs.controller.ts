import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { taskLogsSService } from './task-logs.service';
import { TCreateTaskTimeBody } from './task-logs.types';

export const createTaskLog = async (req: Request<{}, {}, TCreateTaskTimeBody>, res: Response, next: NextFunction) => {
	try {
		await taskLogsSService.createTaskLog(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
