import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../common/constants';
import { io } from '../../websocket';

const changeUserRole = async (userUuid: string, userRoleUuid: string, projectUuid: string, fromUserUuid: string) => {
	const memberRole = await prismaAppClient.dictionary.findUnique({
		where: { uuid: userRoleUuid },
		select: { uuid: true, label: true, key: true },
	});

	if (!memberRole) {
		throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
	}

	await prismaAppClient.$transaction(async (tx) => {
		const membership = await tx.membership.upsert({
			where: { user_project: { projectUuid, userUuid } },
			update: {
				userRoleUuid: memberRole.uuid,
			},
			create: {
				userUuid,
				projectUuid,
				userRoleUuid: memberRole.uuid,
			},
			select: {
				uuid: true,
				project: {
					select: {
						uuid: true,
						code: true,
					},
				},
			},
		});

		if (memberRole.key === 'owner') {
			const roleForOldOwner = await tx.dictionary.findUnique({
				where: { key_type: { key: 'member', type: 'ROLE_TYPE' } },
				select: { uuid: true },
			});

			if (!roleForOldOwner) {
				throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
			}

			await tx.membership.update({
				where: { user_project: { projectUuid, userUuid: fromUserUuid } },
				data: {
					userRoleUuid: roleForOldOwner.uuid,
				},
			});
		}

		const notification = await tx.notification.create({
			data: {
				fromUserUuid: fromUserUuid,
				toUserUuid: userUuid,
				memberShipsUuid: membership.uuid,
				entityType: 'PROJECT',
				extraData: memberRole.label,
			},
			select: {
				uuid: true,
				createdAt: true,
				fromUser: {
					select: {
						uuid: true,
						userName: true,
					},
				},
			},
		});

		io.to(`user:${userUuid}`).emit('project:updated', {
			id: notification.uuid,
			createdAt: notification.createdAt,
			entity: { uuid: membership.project.uuid, type: 'PROJECT', code: membership.project.code },
			extraData: memberRole.label,
			user: {
				uuid: notification.fromUser.uuid,
				userName: notification.fromUser.userName,
			},
			isReaded: false,
		});
	});
};

export const membershipsService = { changeUserRole };
