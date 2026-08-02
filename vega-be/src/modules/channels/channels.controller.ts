import { NextFunction, Request, Response } from 'express';
import { channelsService } from './channels.service';
import { RESPONSE_STATUSES } from '../../common/constants';
import { IGetChannelsBody } from './channels.types';

export const getChannelsByUserUuidController = async (
	req: Request<{}, {}, Partial<IGetChannelsBody>>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const channels = await channelsService.getChannelsByUserUuid(res.locals.user.id, req.body.searchValue);

		res.status(RESPONSE_STATUSES.success).json({ channels });
	} catch (e) {
		next(e);
	}
};

export const getChannelsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const channels = await channelsService.getChannels(res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ channels });
	} catch (e) {
		next(e);
	}
};
