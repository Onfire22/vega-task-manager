import { z } from 'zod';
import { getNotificationsResponseSchema } from '@/api/notifiactions/notifiactions.validation.ts';

export type TNotificationsResponse = z.infer<typeof getNotificationsResponseSchema>;

export interface INotification {
	id: string;
	isReaded: boolean;
	createdAt: string;
	extraData?: string;
	entity: {
		uuid?: string;
		type: 'TASK' | 'TASK_STATUS' | 'PROJECT';
		code?: string;
	};
	user: {
		uuid: string;
		userName: string;
	};
}

export type TNotificationsList = TNotificationsResponse['notifications'];
