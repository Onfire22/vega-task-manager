import { z } from 'zod';

export const CreateTaskTimeBodySchema = z.object({
	estimateTime: z.string().optional(),
	loggedTime: z.string(),
	description: z.string().optional(),
	taskUuid: z.string(),
});

export const getTaskLogsPramsSchema = z.object({
	uuid: z.string(),
});
