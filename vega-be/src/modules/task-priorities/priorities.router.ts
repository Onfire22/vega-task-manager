import { Router } from 'express';
import { getPrioritiesList } from './priorities.controller';

const prioritiesRouter = Router();

prioritiesRouter.get('/', getPrioritiesList);

export { prioritiesRouter };
