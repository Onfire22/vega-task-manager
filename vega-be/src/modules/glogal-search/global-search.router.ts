import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { getGlobalSearchResults } from './global-search.controller';

const globalSearchRouter = Router();

globalSearchRouter.get(ROUTES.search, getGlobalSearchResults);

export { globalSearchRouter };
