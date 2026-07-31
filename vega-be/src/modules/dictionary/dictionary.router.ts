import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { getDictionariesController } from './dictionary.controller';
import { validateMiddleware } from '../../common/middlewares';
import { DictionariesQuerySchema } from './dictionary.validation';

const dictionaryRouter = Router();

dictionaryRouter.get(
	ROUTES.dictionaries,
	validateMiddleware(DictionariesQuerySchema, 'query'),
	getDictionariesController,
);

export { dictionaryRouter };
