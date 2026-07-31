import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { getChannelMessagesController } from './messages.controller';

const messagesRouter = Router();

messagesRouter.get(ROUTES.messages, getChannelMessagesController);

export { messagesRouter };
