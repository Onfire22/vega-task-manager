import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';
import {
	ICreateProjectRequestBody,
	IProjectDB,
	IProjectResponse,
	IProjectsRequest,
	IProjectsResponse,
	TUpdateProjectRequest,
} from './projects.types';
import { IDefaultResponse, ILocals } from '../../common/types';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';
import { normalizeProject } from './projects.mappers';

export const getProjects = async (req: Request, res: Response<IProjectsResponse>, next: NextFunction) => {
	try {
		const projects = await prismaAppClient.project.findMany({
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
				tasks: {
					select: {
						code: true,
						title: true,
						createdAt: true,
						taskPriority: {
							select: { color: true, id: true, name: true },
						},
						taskStatus: {
							select: { color: true, id: true, name: true },
						},
						taskStack: {
							select: { color: true, id: true, name: true },
						},
					},
				},
			},
		});

		res.status(200).json({ projects });
	} catch (e) {
		next(next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError)));
	}
};

export const createProject = async (
	req: Request<{}, {}, ICreateProjectRequestBody>,
	res: Response<IDefaultResponse, ILocals>,
	next: NextFunction,
) => {
	try {
		const { usersUuids, title, description } = req.body;

		const userId = res.locals.user.id;

		const userUUids = [...usersUuids, userId];

		const code = req.body.title.slice(0, 2).toUpperCase();

		const dictionaries = await prismaAppClient.dictionary.findMany({
			where: {
				name: {
					in: ['member', 'owner'],
				},
				type: 'ROLE_TYPE',
			},
			select: {
				id: true,
				name: true,
			},
		});

		const { owner, member } = dictionaries.reduce(
			(acc, item) => {
				acc[item.name] = item;
				return acc;
			},
			{} as Record<string, { name: string; id: string }>,
		);

		if (!owner || !member) {
			next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
			return;
		}

		const usersData = userUUids.map((uuid) => {
			return {
				user: { connect: { id: uuid } },
				userRole: {
					connect: {
						id: uuid === userId ? owner.id : member.id,
					},
				},
			};
		});

		await prismaAppClient.project.create({
			data: {
				title,
				description,
				code,
				memberships: {
					create: usersData,
				},
			},
		});

		res.status(200).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getProjectByUuid = async (
	req: Request<IProjectsRequest>,
	res: Response<IProjectResponse>,
	next: NextFunction,
) => {
	try {
		const projectUuid = req.params.uuid;

		if (!projectUuid) {
			return next(new AppError('missing project uuid', RESPONSE_STATUSES.iternalError));
		}

		const project = await prismaAppClient.project.findUnique({
			where: {
				id: projectUuid,
			},
			select: {
				id: true,
				title: true,
				description: true,
				createdAt: true,
				memberships: {
					where: {
						projectUuid,
					},
					select: {
						userRole: {
							select: {
								id: true,
								name: true,
							},
						},
						user: {
							select: {
								id: true,
								name: true,
								secondName: true,
							},
						},
					},
				},
				tasks: {
					select: {
						id: true,
						code: true,
						title: true,
						taskPriority: {
							select: DICTIONARY_SELECT,
						},
						taskStatus: {
							select: DICTIONARY_SELECT,
						},
						taskStack: {
							select: DICTIONARY_SELECT,
						},
						assignee: {
							select: USER_SELECT,
						},
					},
				},
			},
		});

		const mappedProject = normalizeProject(project as IProjectDB);

		res.status(RESPONSE_STATUSES.success).json({ project: mappedProject });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const updateProject = async (
	req: Request<IProjectsRequest, {}, TUpdateProjectRequest>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { uuid } = req.params;

		await prismaAppClient.project.update({
			where: { id: uuid },
			data: req.body,
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const addUserToProject = async (
	req: Request<IProjectsRequest, {}, { userUuid: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { uuid } = req.params;

		const { userUuid } = req.body;

		const memberRole = await prismaAppClient.dictionary.findUnique({
			where: { name_type: { name: 'member', type: 'ROLE_TYPE' } },
			select: { id: true },
		});

		if (!memberRole) {
			return next(new AppError('Роль не найдена', RESPONSE_STATUSES.notFound));
		}

		await prismaAppClient.membership.upsert({
			where: { userUuid_projectUuid: { projectUuid: uuid, userUuid } },
			update: {
				userRoleUuid: memberRole.id,
			},
			create: {
				userUuid: userUuid,
				projectUuid: uuid,
				userRoleUuid: memberRole.id,
			},
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
