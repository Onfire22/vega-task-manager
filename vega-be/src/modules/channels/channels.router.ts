import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { getChannels } from './channels.controller';

const channelsRouter = Router();

channelsRouter.get(ROUTES.channels, getChannels);

export { channelsRouter };
