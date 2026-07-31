import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { getGlobalSearchResultsController } from './global-search.controller';

const globalSearchRouter = Router();

globalSearchRouter.get(ROUTES.search, getGlobalSearchResultsController);

export { globalSearchRouter };
