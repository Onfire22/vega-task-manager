import { NextFunction, Request, Response } from 'express';
import { channelsService } from './channels.service';
import { RESPONSE_STATUSES } from '../../common/constants';

export const getChannels = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const channels = await channelsService.getChannels();
		res.status(RESPONSE_STATUSES.success).json({ channels });
	} catch (e) {
		next(e);
	}
};
