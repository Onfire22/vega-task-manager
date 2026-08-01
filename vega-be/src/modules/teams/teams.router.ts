import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { createTeamController } from './teams.controller';
import { upload } from '../../lib/multer';

const teamsRouter = Router();

teamsRouter.post(ROUTES.teams, upload.any(), createTeamController);

export { teamsRouter };
