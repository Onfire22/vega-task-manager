import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';

export const getTaskStatusesList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskStatuses = await prismaAppClient.taskStatuses.findMany();
		if (taskStatuses) {
			res.status(RESPONSE_STATUSES.success).json({ success: true, payload: taskStatuses });
		}
	} catch (e) {
		next(new AppError('Статус не найден', RESPONSE_STATUSES.notFound));
	}
};
