import { prismaAppClient } from '../../lib/prisma';
import { normalizeNotifications } from './notifications.utils';

const getNotifications = async (userUuid: string) => {
	const notifications = await prismaAppClient.notification.findMany({
		where: { toUserUuid: userUuid },
		orderBy: {
			createdAt: 'desc',
		},
		select: {
			createdAt: true,
			id: true,
			entityType: true,
			isReaded: true,
			extraData: true,
			fromUser: {
				select: {
					id: true,
					userName: true,
				},
			},
			task: {
				select: {
					id: true,
					code: true,
				},
			},
			memberships: {
				select: {
					project: {
						select: {
							id: true,
							code: true,
						},
					},
				},
			},
		},
	});

	return normalizeNotifications(notifications);
};

const setNotificationsRead = async (userUuid: string) => {
	const notifications = await prismaAppClient.$transaction(async (tx) => {
		await tx.notification.updateMany({
			where: { toUserUuid: userUuid },
			data: { isReaded: true },
		});

		return tx.notification.findMany({
			where: {
				toUserUuid: userUuid,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				createdAt: true,
				id: true,
				entityType: true,
				isReaded: true,
				extraData: true,
				fromUser: {
					select: {
						id: true,
						userName: true,
					},
				},
				task: {
					select: {
						id: true,
						code: true,
					},
				},
				memberships: {
					select: {
						project: {
							select: {
								id: true,
								code: true,
							},
						},
					},
				},
			},
		});
	});

	return normalizeNotifications(notifications);
};

export const notificationsService = {
	getNotifications,
	setNotificationsRead,
};
