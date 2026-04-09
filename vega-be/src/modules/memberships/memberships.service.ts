import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { io } from '../../websocket';

const changeUserRole = async (userUuid: string, userRoleUuid: string, projectUuid: string, fromUserUuid: string) => {
	const memberRole = await prismaAppClient.dictionary.findUnique({
		where: { id: userRoleUuid },
		select: { id: true, label: true, key: true },
	});

	if (!memberRole) {
		throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
	}

	await prismaAppClient.$transaction(async (tx) => {
		const membership = await tx.membership.upsert({
			where: { user_project: { projectUuid, userUuid } },
			update: {
				userRoleUuid: memberRole.id,
			},
			create: {
				userUuid,
				projectUuid,
				userRoleUuid: memberRole.id,
			},
			select: {
				id: true,
				project: {
					select: {
						id: true,
						code: true,
					},
				},
			},
		});

		if (memberRole.key === 'owner') {
			const roleForOldOwner = await tx.dictionary.findUnique({
				where: { key_type: { key: 'member', type: 'ROLE_TYPE' } },
				select: { id: true },
			});

			if (!roleForOldOwner) {
				throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
			}

			await tx.membership.update({
				where: { user_project: { projectUuid, userUuid: fromUserUuid } },
				data: {
					userRoleUuid: roleForOldOwner.id,
				},
			});
		}

		const notification = await tx.notification.create({
			data: {
				fromUserUuid: fromUserUuid,
				toUserUuid: userUuid,
				memberShipsUuid: membership.id,
				entityType: 'PROJECT',
				extraData: memberRole.label,
			},
			select: {
				id: true,
				createdAt: true,
				fromUser: {
					select: {
						id: true,
						userName: true,
					},
				},
			},
		});

		io.to(`user:${userUuid}`).emit('project:updated', {
			id: notification.id,
			createdAt: notification.createdAt,
			entity: { uuid: membership.project.id, type: 'PROJECT', code: membership.project.code },
			extraData: memberRole.label,
			user: {
				uuid: notification.fromUser.id,
				userName: notification.fromUser.userName,
			},
			isReaded: false,
		});
	});
};

export const membershipsService = { changeUserRole };
