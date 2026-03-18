import { Router } from 'express';
import { ROUTES } from '../../constants';
import { changeUserMembership } from './memberships.controller';

const membershipsRouter = Router();

membershipsRouter.post(ROUTES.projectUsers, changeUserMembership);

export { membershipsRouter };
