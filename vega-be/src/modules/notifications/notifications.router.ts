import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { getNotificationsController, setNotificationsReadController } from './notifications.controller';

const notificationsRouter = Router();

notificationsRouter.get(ROUTES.notifications, getNotificationsController);

notificationsRouter.post(ROUTES.notifications, setNotificationsReadController);

export { notificationsRouter };
