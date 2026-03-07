import { NextFunction, Request, Response } from 'express';
import { AppError } from './errors';

export const errorMiddleware = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		console.error(err);
		return res.status(err.statusCode).json({
			status: err.statusCode,
			message: err.message,
		});
	}

	console.error(err);
	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
};
