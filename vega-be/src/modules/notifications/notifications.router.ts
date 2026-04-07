import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { getNotifications, setNotificationsRead } from './notifications.controller';

const notificationsRouter = Router();

notificationsRouter.get(ROUTES.notifications, getNotifications);

notificationsRouter.post(ROUTES.notifications, setNotificationsRead);

export { notificationsRouter };
