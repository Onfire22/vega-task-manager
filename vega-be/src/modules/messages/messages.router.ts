import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { getChannelMessages } from './messages.controller';

const messagesRouter = Router();

messagesRouter.get(ROUTES.messages, getChannelMessages);

export { messagesRouter };
