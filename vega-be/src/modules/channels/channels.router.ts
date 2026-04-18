import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { getChannels, getChannelsByUserUuid } from './channels.controller';

const channelsRouter = Router();

channelsRouter.get(ROUTES.userChannels, getChannelsByUserUuid);
channelsRouter.get(ROUTES.channels, getChannels);

export { channelsRouter };
