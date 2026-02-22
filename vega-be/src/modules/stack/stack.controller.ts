import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';

export const getStackList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const stacks = await prismaAppClient.stack.findMany();
		if (stacks) {
			res.status(RESPONSE_STATUSES.success).json({ success: true, payload: stacks });
		}
	} catch (e) {
		next(new AppError('Стэк не найден', RESPONSE_STATUSES.notFound));
	}
};
