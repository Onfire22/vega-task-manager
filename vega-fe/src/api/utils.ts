import type { TDictionary } from '@/api/dictionaries/dictionaries.types.ts';
import type { TNotificationsList } from '@/api/notifiactions/notifiactions.types.ts';
import { format } from 'date-fns';
import { DATE_TIME_FORMAT } from '@/api/constants.ts';

export const transformDictionaries = (dictionary: TDictionary) => {
	return dictionary.map((item) => {
		return { label: item.label, value: item.id, key: item.key, description: item.description };
	});
};

export const transformNotifications = (notifications: TNotificationsList) => {
	return notifications.map((item) => {
		const entityType = item.entityType === 'PROJECT' ? 'project' : 'task';
		return {
			id: item.id,
			isReaded: item.isReaded,
			...(item.extraData ? { extraData: item.extraData } : {}),
			createdAt: format(item.createdAt, DATE_TIME_FORMAT),
			entity: { uuid: item[entityType]?.id, type: item.entityType, code: item[entityType]?.code },
			user: { uuid: item.fromUser.id, userName: item.fromUser.userName },
		};
	});
};
