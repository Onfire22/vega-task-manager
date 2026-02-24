import { Router } from 'express';
import { ROUTES } from '../../constants';
import { getDictionaries } from './dictionary.controller';

const dictionaryRouter = Router();

dictionaryRouter.get(ROUTES.dictionaries, getDictionaries);

export { dictionaryRouter };
