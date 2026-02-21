import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../lib/prisma';
import { AppError } from '../errors/errors';
import { RESPONSE_STATUSES } from '../lib/constants';

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
