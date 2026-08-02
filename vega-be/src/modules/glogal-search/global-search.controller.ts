import { NextFunction, Request, Response } from 'express';
import { globalSearchResultsService } from './global-search.service';
import { RESPONSE_STATUSES } from '../../common/constants';

export const getGlobalSearchResultsController = async (
	req: Request<{}, {}, {}, { search: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const results = await globalSearchResultsService.getGlobalSearchResults(req.query.search);

		res.status(RESPONSE_STATUSES.success).json({ results });
	} catch (e) {
		next(e);
	}
};
