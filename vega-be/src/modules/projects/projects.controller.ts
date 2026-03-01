import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const projects = await prismaAppClient.projects.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				code: true,
				createdAt: true,
				memberships: {
					select: {
						userUuid: true,
						userRoleUuid: true,
					},
				},
			},
		});

		res.status(200).json({ projects });
	} catch (e) {
		next(next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError)));
	}
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const projectData = req.body;

		const userId = res.locals?.user?.id;

		const code = req.body.title.slice(0, 2).toUpperCase();

		const newProject = await prismaAppClient.projects.create({
			data: {
				...projectData,
				code,
				memberships: {
					create: {
						user: { connect: { id: userId } },
						userRole: {
							connect: {
								name_type: {
									name: 'owner',
									type: 'ROLE_TYPE',
								},
							},
						},
					},
				},
			},
		});

		res.status(200).json({ newProject });
	} catch (e) {
		next(next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError)));
	}
};
