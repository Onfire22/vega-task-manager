import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';

export const getPrioritiesList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const priorities = await prismaAppClient.taskPriotiry.findMany();
		if (priorities) {
			res.status(RESPONSE_STATUSES.success).json({ success: true, payload: priorities });
		}
	} catch (e) {
		next(new AppError('Приоритет не найден', RESPONSE_STATUSES.notFound));
	}
};
