import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
	const id = res.locals?.user?.id;
	try {
		if (id) {
			const currentUser = await prismaAppClient.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					name: true,
					secondName: true,
				},
			});

			if (!currentUser) {
				throw new AppError('User not found', RESPONSE_STATUSES.notFound);
			}

			res.status(200).json(currentUser);
		}
	} catch (e) {
		next(e);
	}
};

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userList = await prismaAppClient.user.findMany({
			select: {
				id: true,
				name: true,
				secondName: true,
			},
		});

		res.status(200).json({ userList });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
