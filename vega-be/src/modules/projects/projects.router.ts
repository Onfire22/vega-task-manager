import { Router } from 'express';
import { createProject, getProjects } from './projects.controller';
import { ROUTES } from '../../constants';

const projectsRouter = Router();

projectsRouter.get(ROUTES.projects, getProjects);
projectsRouter.post(ROUTES.projectsCreate, createProject);

export { projectsRouter };
