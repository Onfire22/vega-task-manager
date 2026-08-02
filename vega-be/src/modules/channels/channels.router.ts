import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { getChannelsController, getChannelsByUserUuidController } from './channels.controller';

const channelsRouter = Router();

channelsRouter.post(ROUTES.userChannels, getChannelsByUserUuidController);
channelsRouter.get(ROUTES.channels, getChannelsController);

export { channelsRouter };
