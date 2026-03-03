import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';
import { prismaAppClient } from '../../lib/prisma';
import { ICreateProjectRequestBody, IProjectsResponse } from './projects.types';
import { IDefaultResponse, ILocals } from '../../common/types';

export const getProjects = async (req: Request, res: Response<IProjectsResponse>, next: NextFunction) => {
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

		const dictionaries = await prismaAppClient.dictionaries.findMany({
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

		await prismaAppClient.projects.create({
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
