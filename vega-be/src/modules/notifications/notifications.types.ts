import { Prisma } from '../../generated/prisma/client';

export type TNotifications = Prisma.NotificationGetPayload<{
	select: {
		createdAt: true;
		id: true;
		entityType: true;
		isReaded: true;
		extraData: true;
		fromUser: {
			select: {
				id: true;
				userName: true;
			};
		};
		task: {
			select: {
				id: true;
				code: true;
			};
		};
		memberships: {
			select: {
				project: {
					select: {
						id: true;
						code: true;
					};
				};
			};
		};
	};
}>;
