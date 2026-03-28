import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { TProjectParams } from './projects.types';

export const checkIsOwnerMiddleware = async (req: Request<TProjectParams>, res: Response, next: NextFunction) => {
	try {
		const { userRoleUuid } = req.body;

		const roles = await prismaAppClient.dictionary.findMany({
			where: { type: 'ROLE_TYPE' },
			select: { id: true, key: true },
		});

		const userRole = roles.find((role) => role.id === userRoleUuid)?.key;

		if (!userRole || userRole !== 'owner') {
			return next(new AppError('У вас недостаточно прав', RESPONSE_STATUSES.notAllowed));
		}

		next();
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
