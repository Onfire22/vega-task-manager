import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { createTeamController } from './teams.controller';

const teamsRouter = Router();

teamsRouter.post(ROUTES.teams, createTeamController);

export { teamsRouter };
