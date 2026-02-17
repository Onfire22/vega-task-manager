import { Request, Response, NextFunction } from 'express';
import { prismaAppClient } from '../lib/prisma';
import { generateToken } from './auth.service';
import { DAY_IN_SECONDS, RESPONSE_STATUSES } from '../lib/constants';
import { AppError } from '../errors/errors';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userData = req.body;
		const newUser = await prismaAppClient.user.create({ data: userData });
		const token = generateToken(newUser.id);
		res.status(RESPONSE_STATUSES.authorised)
			.cookie('token', token, {
				httpOnly: true,
				maxAge: DAY_IN_SECONDS,
			})
			.json({ success: true });
	} catch (e) {
		next(new AppError('Iternal error', RESPONSE_STATUSES.iternalError));
	}
};
