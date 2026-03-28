import { z } from 'zod';

export const TaskCommentsParamsSchema = z.object({
	uuid: z.string(),
});

export const CreateCommentBodySchema = z.object({
	taskUuid: z.string(),
	text: z.string(),
});

export const UpdateCommentParamsSchema = z.object({
	uuid: z.string(),
});

export const UpdateCommentBodySchema = z.object({
	text: z.string(),
});

export const DeleteCommentParamsSchema = z.object({
	uuid: z.string(),
});
