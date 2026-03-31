import { z } from 'zod';

export const CreateProjectBodySchema = z.object({
	title: z.string(),
	description: z.string(),
	deadlineDate: z.string(),
	usersUuids: z.array(z.string()),
});

export const ProjectParamsSchema = z.object({
	uuid: z.string(),
});

export const EditProjectBodySchema = z.object({
	field: z.enum(['deadlineDate', 'projectStatusUuid']),
	value: z.string(),
	userRoleUuid: z.string(),
});
