import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';
import { ICreateProjectRequestBody, IProjectsRequest, TUpdateProjectRequest } from './projects.types';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';
import { normalizeProject } from './projects.mappers';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
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
							select: { id: true, label: true },
						},
						taskStatus: {
							select: { id: true, label: true },
						},
						taskStack: {
							select: { id: true, label: true },
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
	res: Response,
	next: NextFunction,
) => {
	try {
		const { usersUuids, title, description } = req.body;

		const userId = res.locals.user.id;

		const userUUids = [...usersUuids, userId];

		const dictionaries = await prismaAppClient.dictionary.findMany({
			where: {
				OR: [
					{
						key: { in: ['member', 'owner'] },
						type: 'ROLE_TYPE',
					},
					{
						key: 'p_backlog',
						type: 'PROJECT_STATUS',
					},
				],
			},
			select: {
				id: true,
				label: true,
				key: true,
			},
		});

		const { owner, member, p_backlog } = dictionaries.reduce(
			(acc, item) => {
				acc[item.key] = item;
				return acc;
			},
			{} as Record<string, { label: string; id: string; key: string }>,
		);

		if (!owner || !member) {
			next(new AppError('Справочник не найден', RESPONSE_STATUSES.iternalError));
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

		const project = await prismaAppClient.$transaction(async (tx) => {
			const project = await tx.project.create({
				data: {
					title,
					description,
					projectStatusUuid: p_backlog.id,
					memberships: {
						create: usersData,
					},
				},
				select: { id: true },
			});

			const code = `#${project.id.slice(0, 4).toUpperCase()}`;

			return tx.project.update({
				where: { id: project.id },
				data: { code },
			});
		});

		res.status(200).json({ project });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};

export const getProjectByUuid = async (req: Request<IProjectsRequest>, res: Response, next: NextFunction) => {
	try {
		const projectUuid = req.params.uuid;

		if (!projectUuid) {
			return next(new AppError('missing project uuid', RESPONSE_STATUSES.iternalError));
		}

		const project = await prismaAppClient.project.findUniqueOrThrow({
			where: {
				id: projectUuid,
			},
			select: {
				id: true,
				title: true,
				description: true,
				createdAt: true,
				code: true,
				projectStatus: {
					select: {
						label: true,
						description: true,
						id: true,
						key: true,
					},
				},
				memberships: {
					where: {
						projectUuid,
					},
					select: {
						userRole: {
							select: {
								id: true,
								label: true,
								key: true,
							},
						},
						user: {
							select: {
								id: true,
								name: true,
								secondName: true,
								userSpecialisation: {
									select: { label: true },
								},
							},
						},
					},
				},
				tasks: {
					select: {
						id: true,
						code: true,
						title: true,
						createdAt: true,
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

		const mappedProject = normalizeProject(project);

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
			where: { label_type: { label: 'member', type: 'ROLE_TYPE' } },
			select: { id: true },
		});

		if (!memberRole) {
			return next(new AppError('Роль не найдена', RESPONSE_STATUSES.notFound));
		}

		await prismaAppClient.membership.upsert({
			where: { user_project: { projectUuid: uuid, userUuid } },
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
