import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { Type } from '../../generated/prisma/enums';

export const getDictionaries = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.query.filter) {
			next(new AppError('You need to chose dictionaries types', RESPONSE_STATUSES.notFound));
		}

		const filter = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter];

		const validFilters = filter.filter((value): value is Type => Object.values(Type).includes(value as Type));

		const dictionaries = await prismaAppClient.dictionaries.findMany({
			where: { type: { in: validFilters } },
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true, payload: dictionaries });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
