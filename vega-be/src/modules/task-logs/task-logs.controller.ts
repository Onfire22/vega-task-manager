import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { taskLogsSService } from './task-logs.service';
import { TCreateTaskTimeBody, TGetTaskLogsPrams } from './task-logs.types';

export const createTaskLog = async (req: Request<{}, {}, TCreateTaskTimeBody>, res: Response, next: NextFunction) => {
	try {
		await taskLogsSService.createTaskLog(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const getTaskLogs = async (req: Request<TGetTaskLogsPrams>, res: Response, next: NextFunction) => {
	try {
		const timeLogs = await taskLogsSService.getTaskLogs(req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ timeLogs });
	} catch (e) {
		next(e);
	}
};
