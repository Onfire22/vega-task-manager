import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import jwt from 'jsonwebtoken';
import { RESPONSE_STATUSES } from '../../constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return next(new AppError('Not authorised', RESPONSE_STATUSES.notAuthorised));
	}

	try {
		const jwtSecret = process.env.JWT_ACCESS_SECRET as string;
		res.locals.user = jwt.verify(token, jwtSecret);
		next();
	} catch (e) {
		next(new AppError('Not authorised', RESPONSE_STATUSES.notAuthorised));
	}
};
