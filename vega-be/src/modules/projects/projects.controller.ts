import { NextFunction, Request, Response } from 'express';
import { RESPONSE_STATUSES } from '../../constants';
import { TCreateProjectBody, TEditProjectBody, TGetProjectsBody, TProjectParams } from './projects.types';
import { projectsService } from './projects.service';

export const getProjects = async (req: Request<{}, {}, TGetProjectsBody>, res: Response, next: NextFunction) => {
	console.log(req.body);
	try {
		const {
			meta: { pagination },
		} = req.body;

		const projects = await projectsService.getProjects(pagination);

		res.status(200).json(projects);
	} catch (e) {
		next(e);
	}
};

export const createProject = async (req: Request<{}, {}, TCreateProjectBody>, res: Response, next: NextFunction) => {
	try {
		const project = await projectsService.createProject(req.body, res.locals.user.id);

		res.status(200).json({ id: project.id });
	} catch (e) {
		next(e);
	}
};

export const getProjectByUuid = async (req: Request<TProjectParams>, res: Response, next: NextFunction) => {
	try {
		const project = await projectsService.getProject(req.params.uuid, res.locals.user.id);

		res.status(RESPONSE_STATUSES.success).json({ project });
	} catch (e) {
		next(e);
	}
};

export const updateProject = async (
	req: Request<TProjectParams, {}, TEditProjectBody>,
	res: Response,
	next: NextFunction,
) => {
	try {
		await projectsService.updateProject(req.body, req.params.uuid);

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(e);
	}
};
