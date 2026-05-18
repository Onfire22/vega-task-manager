import { z } from 'zod';

export const GetTaskLogsResponseSchema = z.object({
	timeLogs: z.array(
		z.object({
			id: z.string(),
			loggedTime: z.string().optional(),
			description: z.string().optional(),
			createdAt: z.string(),
			updatedAt: z.string().optional(),
			user: z.object({
				id: z.string(),
				name: z.string(),
				secondName: z.string(),
				userName: z.string(),
				avatarUrl: z.string().nullable(),
			}),
			loggedTimeInSecs: z.number().int(),
		}),
	),
});
