import { TNotifications } from './notifications.types';

export const normalizeNotifications = (notifications: Array<TNotifications>) => {
	return notifications.map((item) => {
		const { memberships, ...rest } = item;

		return {
			...rest,
			...(memberships ? { project: memberships.project } : {}),
		};
	});
};
