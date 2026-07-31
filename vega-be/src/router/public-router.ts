import { Router } from 'express';
import { dictionaryRouter } from '../modules/dictionary/dictionary.router';
import { companiesRouter } from '../modules/companies/companies.router';
import { teamsRouter } from '../modules/teams/teams.router';
import { ROUTES } from './routes';

const publicRouter = Router();

publicRouter.use(ROUTES.root, dictionaryRouter);
publicRouter.use(ROUTES.root, companiesRouter);
publicRouter.use(ROUTES.root, teamsRouter);

export { publicRouter };
