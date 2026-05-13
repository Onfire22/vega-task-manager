import { NextFunction, Request, Response } from 'express';
import { AppError } from './errors';
import { ZodError } from 'zod';
import { IError } from './errors.types';
import multer from 'multer';

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

	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({ error: 'Файл слишком большой' });
		}
		if (err.code === 'LIMIT_FILE_COUNT') {
			return res.status(400).json({ error: 'Слишком много файлов' });
		}
		return res.status(400).json({ error: err.message });
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
};
