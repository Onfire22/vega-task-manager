import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { IPagination, TCreateProjectBody, TEditProjectBody } from './projects.types';
import { DICTIONARY_SELECT, RESPONSE_STATUSES, USER_SELECT } from '../../common/constants';
import { normalizeProject, normalizeProjectsList } from './projects.mappers';

const getProjects = async (pagination: IPagination, userUuid: string) => {
	const { page, pageLimit } = pagination;

	const { projects, total } = await prismaAppClient.$transaction(async (tx) => {
		const projectsData = await tx.project.findMany({
			skip: (page - 1) * pageLimit,
			take: pageLimit,
			where: {
				memberships: {
					some: {
						userUuid,
					},
				},
			},
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

		const total = await tx.project.count();

		return {
			projects: normalizeProjectsList(projectsData),
			total,
		};
	});

	return {
		projects,
		meta: {
			total,
			page,
			pageLimit,
			hasPrev: page > 1,
			hasNext: page * pageLimit < total,
			totalPages: Math.ceil(total / pageLimit),
		},
	};
};

const createProject = async (projectData: TCreateProjectBody, userId: string) => {
	const { usersUuids, title, description, deadlineDate } = projectData;

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
		throw new AppError('Справочник не найден', RESPONSE_STATUSES.internalError);
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

	return prismaAppClient.$transaction(async (tx) => {
		const project = await tx.project.create({
			data: {
				title,
				description,
				...(deadlineDate ? { deadlineDate: new Date(deadlineDate).toISOString() } : {}),
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
};

const getProject = async (projectUuid: string, userId: string) => {
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

	return normalizeProject(project, userId);
};

const updateProject = (projectData: TEditProjectBody, projectUuid: string) => {
	const { field, value } = projectData;

	const data = field === 'deadlineDate' ? new Date(value).toISOString() : value;

	return prismaAppClient.project.update({
		where: { id: projectUuid },
		data: { [field]: data },
	});
};

export const projectsService = { getProjects, createProject, getProject, updateProject };
