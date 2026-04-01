import { z } from 'zod';

export const UpdateTaskTimeBodySchema = z.object({
	estimateTime: z.string().optional(),
	loggedTime: z.string().optional(),
	description: z.string().optional(),
});

export const TaskParamsSchema = z.object({
	uuid: z.string(),
});
