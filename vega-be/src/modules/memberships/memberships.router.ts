import { Router } from 'express';
import { ROUTES } from '../../router/routes';
import { changeUserMembershipController } from './memberships.controller';
import { validateMiddleware } from '../../common/middlewares';
import { ChangeUserMembershipBodySchema, ChangeUserMembershipParamsSchema } from './memberships.validation';

const membershipsRouter = Router();

membershipsRouter.post(
	ROUTES.projectUsers,
	[
		validateMiddleware(ChangeUserMembershipParamsSchema, 'params'),
		validateMiddleware(ChangeUserMembershipBodySchema),
	],
	changeUserMembershipController,
);

export { membershipsRouter };
