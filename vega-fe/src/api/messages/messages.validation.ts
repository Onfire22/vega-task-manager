import z from 'zod';

export const GetMessagesValidationSchema = z.object({
	messages: z.array(
		z.object({
			id: z.string(),
			text: z.string(),
			channelUuid: z.string(),
			isPinned: z.boolean(),
			updatedAt: z.string(),
			createdAt: z.string(),
			replyToUuid: z.string().nullable(),
			isSystem: z.boolean(),
			canEdit: z.boolean(),
			author: z.object({
				id: z.string(),
				name: z.string(),
				secondName: z.string(),
			}),
		}),
	),
});
