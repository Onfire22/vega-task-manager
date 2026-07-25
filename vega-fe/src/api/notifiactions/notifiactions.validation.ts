import { z } from 'zod';

export const getNotificationsResponseSchema = z.object({
	notifications: z.array(
		z.object({
			uuid: z.string(),
			entityType: z.enum(['TASK', 'TASK_STATUS', 'PROJECT']),
			createdAt: z.string(),
			isReaded: z.boolean(),
			extraData: z.string().nullable(),
			fromUser: z.object({
				uuid: z.string(),
				userName: z.string(),
			}),
			task: z
				.object({
					uuid: z.string(),
					code: z.string(),
				})
				.optional()
				.nullable(),
			project: z
				.object({
					uuid: z.string(),
					code: z.string(),
				})
				.optional(),
		}),
	),
});
