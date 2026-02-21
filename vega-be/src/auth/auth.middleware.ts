import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/errors';
import jwt from 'jsonwebtoken';
import { RESPONSE_STATUSES } from '../lib/constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;
	if (!token) {
		next(new AppError('Not authorised', RESPONSE_STATUSES.notAuthorised));
		return;
	}

	try {
		const jwtSecret = process.env.JWT_SECRET as string;
		res.locals.user = jwt.verify(token, jwtSecret);
		next();
	} catch (e) {
		next(new AppError('Not authorised', RESPONSE_STATUSES.notAuthorised));
	}
};
