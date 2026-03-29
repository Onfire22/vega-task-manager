import { Router } from 'express';
import { ROUTES } from '../../constants';
import { getDictionaries } from './dictionary.controller';
import { validateMiddleware } from '../../common/middlewares';
import { DictionariesQuerySchema } from './dictionary.validation';

const dictionaryRouter = Router();

dictionaryRouter.get(ROUTES.dictionaries, validateMiddleware(DictionariesQuerySchema, 'query'), getDictionaries);

export { dictionaryRouter };
