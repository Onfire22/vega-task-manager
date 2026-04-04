import { Router } from 'express';
import { createProject, getProjectByUuid, getProjects, updateProject } from './projects.controller';
import { ROUTES } from '../../constants';
import { checkIsOwnerMiddleware } from './projects.middleware';
import { validateMiddleware } from '../../common/middlewares';
import { CreateProjectBodySchema, EditProjectBodySchema, ProjectParamsSchema } from './projects.validation';

const projectsRouter = Router();

projectsRouter.post(ROUTES.projects, getProjects);
projectsRouter.post(ROUTES.projectsCreate, validateMiddleware(CreateProjectBodySchema), createProject);
projectsRouter.get(ROUTES.project, validateMiddleware(ProjectParamsSchema, 'params'), getProjectByUuid);
projectsRouter.post(
	ROUTES.project,
	[
		validateMiddleware(ProjectParamsSchema, 'params'),
		validateMiddleware(EditProjectBodySchema),
		checkIsOwnerMiddleware,
	],
	updateProject,
);

export { projectsRouter };
