import { z } from 'zod';
import { getNotificationsResponseSchema } from '@/api/notifiactions/notifiactions.validation.ts';

export type TNotificationsResponse = z.infer<typeof getNotificationsResponseSchema>;

export interface INotification {
	id: string;
	isReaded: boolean;
	createdAt: string;
	entity: {
		uuid: string;
		type: string;
		code: string;
	};
	user: {
		uuid: string;
		userName: string;
	};
}

export type TNotificationsList = TNotificationsResponse['notifications'];
