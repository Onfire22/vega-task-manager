import { z } from 'zod';

export const getNotificationsResponseSchema = z.object({
	notifications: z.array(
		z.object({
			id: z.string(),
			entityType: z.string(),
			createdAt: z.string(),
			isReaded: z.boolean(),
			fromUser: z.object({
				id: z.string(),
				userName: z.string(),
			}),
			task: z.object({
				id: z.string(),
				code: z.string(),
			}),
		}),
	),
});
