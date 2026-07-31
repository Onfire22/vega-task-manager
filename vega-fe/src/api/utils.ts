import type { TDictionary } from '@/api/dictionaries/dictionaries.types.ts';
import type { TNotificationsList } from '@/api/notifiactions/notifiactions.types.ts';
import { format } from 'date-fns';
import { DATE_TIME_FORMAT } from '@/api/constants.ts';

export const transformDictionaries = (dictionary: TDictionary) => {
	return dictionary.map((item) => {
		return { label: item.label, value: item.uuid, key: item.key, description: item.description };
	});
};

export const transformNotifications = (notifications: TNotificationsList) => {
	return notifications.map((item) => {
		const entityType = item.entityType === 'PROJECT' ? 'project' : 'task';
		return {
			uuid: item.uuid,
			isReaded: item.isReaded,
			...(item.extraData ? { extraData: item.extraData } : {}),
			createdAt: format(item.createdAt, DATE_TIME_FORMAT),
			entity: { uuid: item[entityType]?.uuid, type: item.entityType, code: item[entityType]?.code },
			user: { uuid: item.fromUser.uuid, userName: item.fromUser.userName },
		};
	});
};

export const hasFileValues = (body: Record<string, unknown>) => {
	if (!body) return false;

	return Object.values(body).some((item) => item instanceof File);
};
