import { NextFunction, Request, Response } from 'express';
import { AppError } from './errors';
import { ZodError } from 'zod';
import { IError } from './errors.types';

export const errorMiddleware = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: err.statusCode,
			message: err.message,
		});
	}

	if (err instanceof ZodError) {
		const error = err.flatten((issue) => issue.message) as IError;

		if (error.fieldErrors) {
			const errors = Object.entries(error.fieldErrors).reduce<Array<string>>((acc, [key, values]) => {
				acc.push(`${key}: ${values.join(' ')}`);
				return acc;
			}, []);

			return res.status(500).json({
				message: errors.join('; '),
			});
		}
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
};
