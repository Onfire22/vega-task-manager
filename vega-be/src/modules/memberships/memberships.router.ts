import { Router } from 'express';
import { ROUTES } from '../../common/constants';
import { changeUserMembership } from './memberships.controller';
import { validateMiddleware } from '../../common/middlewares';
import { ChangeUserMembershipBodySchema, ChangeUserMembershipParamsSchema } from './memberships.validation';

const membershipsRouter = Router();

membershipsRouter.post(
	ROUTES.projectUsers,
	[
		validateMiddleware(ChangeUserMembershipParamsSchema, 'params'),
		validateMiddleware(ChangeUserMembershipBodySchema),
	],
	changeUserMembership,
);

export { membershipsRouter };
