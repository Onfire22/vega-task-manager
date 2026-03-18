import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';
import { ICreateProjectRequestBody, IEditProjectResponse, IProjectsRequest } from './projects.types';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';
import { normalizeProject, normalizeProjectsList } from './projects.mappers';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const projects = await prismaAppClient.project.findMany({
			select: {
				id: true,
				code: true,
				title: true,
				createdAt: true,
				projectStatus: {
					select: {
						id: true,
						key: true,
						label: true,
					},
				},
				memberships: {
					select: {
						userRole: { select: { id: true, label: true, key: true } },
						user: { select: { id: true, name: true, secondName: true } },
					},
				},
				tasks: {
					select: {
						taskStatus: {
							select: { id: true, label: true, key: true },
						},
					},
				},
			},
		});

		res.status(200).json({ projects: normalizeProjectsList(projects) });
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
		const { usersUuids, title, description, deadlineDate } = req.body;

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
					deadlineDate: new Date(deadlineDate).toISOString(),
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
				deadlineDate: true,
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
	req: Request<{ uuid: string }, {}, IEditProjectResponse>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { field, value } = req.body;

		const data = field === 'deadlineDate' ? new Date(value).toISOString() : value;

		await prismaAppClient.project.update({
			where: { id: req.params.uuid },
			data: { [field]: data },
		});

		res.status(RESPONSE_STATUSES.success).json({ success: true });
	} catch (e) {
		next(new AppError('Iternal server Error', RESPONSE_STATUSES.iternalError));
	}
};
