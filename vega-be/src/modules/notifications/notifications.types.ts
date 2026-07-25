import { Prisma } from '../../generated/prisma/client';

export type TNotifications = Prisma.NotificationGetPayload<{
	select: {
		createdAt: true;
		uuid: true;
		entityType: true;
		isReaded: true;
		extraData: true;
		fromUser: {
			select: {
				uuid: true;
				userName: true;
			};
		};
		task: {
			select: {
				uuid: true;
				code: true;
			};
		};
		memberships: {
			select: {
				project: {
					select: {
						uuid: true;
						code: true;
					};
				};
			};
		};
	};
}>;
