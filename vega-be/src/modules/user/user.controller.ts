import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { ILocals } from '../../common/types';
import { IGetUserListRequestBody, IGetUserListResponse, IUserResponse } from './user.types';

export const getCurrentUser = async (req: Request, res: Response<IUserResponse, ILocals>, next: NextFunction) => {
	try {
		const id = res.locals?.user?.id;

		if (id) {
			const currentUser = await prismaAppClient.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					name: true,
					secondName: true,
					userName: true,
					userSpecialisation: {
						select: {
							label: true,
							key: true,
						},
					},
				},
			});

			if (!currentUser) {
				return next(new AppError('User not found', RESPONSE_STATUSES.notFound));
			}

			res.status(RESPONSE_STATUSES.success).json({ currentUser });
		}
	} catch (e) {
		next(e);
	}
};

export const getUserList = async (
	req: Request<{}, {}, IGetUserListRequestBody>,
	res: Response<IGetUserListResponse>,
	next: NextFunction,
) => {
	try {
		const filters = req.body?.filters;

		const filterData = {
			...(filters?.withoutUser ? { id: { not: filters.withoutUser } } : {}),
			memberships: {
				...(filters?.withOutProject ? { none: { projectUuid: filters.withOutProject } } : {}),
				...(filters?.withProject ? { some: { projectUuid: filters.withProject } } : {}),
			},
		};

		const usersList = await prismaAppClient.user.findMany({
			...(filters ? { where: filterData } : {}),
			select: {
				id: true,
				name: true,
				secondName: true,
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ usersList });
	} catch (e) {
		console.log(e);
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
