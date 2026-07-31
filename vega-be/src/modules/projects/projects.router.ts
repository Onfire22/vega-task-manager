import { Router } from 'express';
import {
	createProjectController,
	getProjectByUuidController,
	getProjectsController,
	updateProjectController,
} from './projects.controller';
import { ROUTES } from '../../router/routes';
import { checkIsOwnerMiddleware } from './projects.middleware';
import { validateMiddleware } from '../../common/middlewares';
import { CreateProjectBodySchema, EditProjectBodySchema, ProjectParamsSchema } from './projects.validation';

const projectsRouter = Router();

projectsRouter.post(ROUTES.projects, getProjectsController);
projectsRouter.post(ROUTES.projectsCreate, validateMiddleware(CreateProjectBodySchema), createProjectController);
projectsRouter.get(ROUTES.project, validateMiddleware(ProjectParamsSchema, 'params'), getProjectByUuidController);
projectsRouter.post(
	ROUTES.project,
	[
		validateMiddleware(ProjectParamsSchema, 'params'),
		validateMiddleware(EditProjectBodySchema),
		checkIsOwnerMiddleware,
	],
	updateProjectController,
);

export { projectsRouter };
