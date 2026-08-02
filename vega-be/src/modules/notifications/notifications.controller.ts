import { NextFunction, Request, Response } from 'express';
import { notificationsService } from './notifications.service';
import { RESPONSE_STATUSES } from '../../common/constants';

export const getNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notifications = await notificationsService.getNotifications(res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ notifications });
	} catch (e) {
		next(e);
	}
};

export const setNotificationsReadController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notifications = await notificationsService.setNotificationsRead(res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ notifications });
	} catch (e) {
		next(e);
	}
};
