import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';

export const getFilePathMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
		return next(new AppError('Файл не найден', RESPONSE_STATUSES.notFound));
	}

	req.file.filename = `/public/uploads/${req.file?.filename}`;

	next();
};
