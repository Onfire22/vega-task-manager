import { Router } from 'express';
import { createProject, getProjectByUuid, getProjects, updateProject } from './projects.controller';
import { ROUTES } from '../../constants';
import { checkIsOwnerMiddleware } from './projects.middleware';

const projectsRouter = Router();

projectsRouter.get(ROUTES.projects, getProjects);
projectsRouter.post(ROUTES.projectsCreate, createProject);
projectsRouter.get(ROUTES.project, getProjectByUuid);
projectsRouter.post(ROUTES.project, checkIsOwnerMiddleware, updateProject);

export { projectsRouter };
