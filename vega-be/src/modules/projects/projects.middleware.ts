import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { TProjectParams } from './projects.types';

export const checkIsOwnerMiddleware = async (req: Request<TProjectParams>, res: Response, next: NextFunction) => {
	try {
		const memberships = await prismaAppClient.membership.findUnique({
			where: {
				user_project: {
					userUuid: res.locals.user.id,
					projectUuid: req.params.uuid,
				},
			},
			select: { userRoleUuid: true },
		});

		if (!memberships) {
			return next(new AppError('Роль в проекте не найдена', RESPONSE_STATUSES.notAllowed));
		}

		const userRole = await prismaAppClient.dictionary.findUnique({
			where: { type: 'ROLE_TYPE', id: memberships.userRoleUuid },
			select: { id: true, key: true },
		});

		if (!userRole || userRole.key !== 'owner') {
			return next(new AppError('У вас недостаточно прав', RESPONSE_STATUSES.notAllowed));
		}

		next();
	} catch (e) {
		next(new AppError('Internal server Error', RESPONSE_STATUSES.internalError));
	}
};
