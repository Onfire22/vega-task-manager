import { Router } from 'express';
import { dictionaryRouter } from '../modules/dictionary/dictionary.router';
import { ROUTES } from './routes';

const publicRouter = Router();

publicRouter.use(ROUTES.root, dictionaryRouter);

export { publicRouter };
