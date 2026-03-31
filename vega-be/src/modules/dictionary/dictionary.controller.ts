import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { IDictionaryResponse, TDictionaries } from './dictionary.types';
import { dictionariesService } from './dictionary.service';

export const getDictionaries = async (
	req: Request<{}, {}, {}, TDictionaries>,
	res: Response<IDictionaryResponse>,
	next: NextFunction,
) => {
	try {
		if (!req.query.filters) {
			next(new AppError('You need to chose dictionaries types', RESPONSE_STATUSES.notFound));
			return;
		}

		const dictionaries = await dictionariesService.getDictionaries(req.query.filters);

		res.status(RESPONSE_STATUSES.success).json({ dictionaries });
	} catch (e) {
		next(e);
	}
};
