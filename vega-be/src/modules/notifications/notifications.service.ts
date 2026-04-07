import { prismaAppClient } from '../../lib/prisma';

const getNotifications = (userUuid: string) => {
	return prismaAppClient.notification.findMany({
		where: { toUserUuid: userUuid },
		select: {
			createdAt: true,
			id: true,
			entityType: true,
			isReaded: true,
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
		},
	});
};

const setNotificationsRead = async (userUuid: string) => {
	return await prismaAppClient.$transaction(async (tx) => {
		await tx.notification.updateMany({
			where: { toUserUuid: userUuid },
			data: { isReaded: true },
		});

		return tx.notification.findMany({
			where: {
				toUserUuid: userUuid,
			},
			select: {
				createdAt: true,
				id: true,
				entityType: true,
				isReaded: true,
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
			},
		});
	});
};

export const notificationsService = {
	getNotifications,
	setNotificationsRead,
};
