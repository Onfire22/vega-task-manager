import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../common/constants';
import { taskLogsService } from './task-logs.service';
import { TCreateTaskTimeBody, TGetTaskLogsPrams } from './task-logs.types';

export const createTaskLog = async (req: Request<{}, {}, TCreateTaskTimeBody>, res: Response, next: NextFunction) => {
	try {
		await taskLogsService.createTaskLog(req.body, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};

export const getTaskLogs = async (req: Request<TGetTaskLogsPrams>, res: Response, next: NextFunction) => {
	try {
		const timeLogs = await taskLogsService.getTaskLogs(req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ timeLogs });
	} catch (e) {
		next(e);
	}
};
