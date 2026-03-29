import { prismaAppClient } from '../../lib/prisma';
import { RESPONSE_STATUSES } from '../../constants';
import { AppError } from '../../errors/errors';
import { NextFunction, Request, Response } from 'express';
import { TChangeUserMembershipBody, TChangeUserMembershipParams } from './memberships.types';

export const changeUserMembership = async (
	req: Request<TChangeUserMembershipParams, {}, TChangeUserMembershipBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { uuid } = req.params;

		const { userUuid, userRole } = req.body;

		const memberRole = await prismaAppClient.dictionary.findUnique({
			where: { key_type: { key: userRole, type: 'ROLE_TYPE' } },
			select: { id: true },
		});

		if (!memberRole) {
			return next(new AppError('Роль не найдена', RESPONSE_STATUSES.notFound));
		}

		await prismaAppClient.membership.upsert({
			where: { user_project: { projectUuid: uuid, userUuid } },
			update: {
				userRoleUuid: memberRole.id,
			},
			create: {
				userUuid: userUuid,
				projectUuid: uuid,
				userRoleUuid: memberRole.id,
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
