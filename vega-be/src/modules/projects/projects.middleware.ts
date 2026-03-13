import { NextFunction, Request, Response } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { OWNER_ROLE_UUID } from './constants';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { IProjectsRequest } from './projects.types';

export const checkIsOwnerMiddleware = async (req: Request<IProjectsRequest>, res: Response, next: NextFunction) => {
	try {
		const userId = res.locals.user.id;

		const { uuid } = req.params;

		const ownerRole = await prismaAppClient.membership.findUnique({
			where: { user_project: { projectUuid: uuid, userUuid: userId } },
			select: { userRoleUuid: true },
		});

		if (!ownerRole || ownerRole.userRoleUuid !== OWNER_ROLE_UUID) {
			return next(new AppError('У вас недостаточно прав', RESPONSE_STATUSES.notAllowed));
		}

		next();
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
