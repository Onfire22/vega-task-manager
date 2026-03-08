import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';

export const createTaskLog = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskLog = prismaAppClient.timeLog.create({
			data: req.body,
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError)));
	}
};
