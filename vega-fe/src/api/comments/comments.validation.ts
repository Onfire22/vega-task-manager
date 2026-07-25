import { z } from 'zod';

export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const CommentsResponseSchema = z.object({
	comments: z.array(
		z.object({
			uuid: z.string(),
			text: z.string(),
			createdAt: z.string(),
			updatedAt: z.string().optional(),
			author: z.object({
				uuid: z.string(),
				name: z.string(),
				secondName: z.string(),
				avatarUrl: z.string().nullable(),
			}),
		}),
	),
});
