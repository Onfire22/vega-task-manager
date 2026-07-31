import { NextFunction, Request, Response } from 'express';
import { messagesService } from './messages.service';
import { RESPONSE_STATUSES } from '../../common/constants';

export const getChannelMessagesController = async (
	req: Request<{ channelUuid: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const messages = await messagesService.getMessages(req.params.channelUuid, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ messages });
	} catch (e) {
		next(e);
	}
};
