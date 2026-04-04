import { z } from 'zod';

export const CreateTaskBodySchema = z.object({
	title: z.string(),
	description: z.string(),
	taskStackUuid: z.string(),
	taskPriorityUuid: z.string(),
	taskProjectUuid: z.string(),
});

export const UserTasksBodySchema = z.object({
	isAssignee: z.boolean(),
	sorting: z.object({
		column: z.string(),
		direction: z.enum(['desc', 'asc']),
	}),
	filters: z.object({
		taskPriority: z.array(z.string()).optional(),
		taskStatus: z.array(z.string()).optional(),
		taskType: z.array(z.string()).optional(),
	}),
	meta: z.object({
		pagination: z.object({
			page: z.number(),
			pageLimit: z.number(),
		}),
	}),
});

export const TaskParamsSchema = z.object({
	uuid: z.string(),
});

export const UpdateTaskEstimateSchema = z.object({
	value: z.string(),
});

export const UpdateTaskBodySchema = z.object({
	value: z.string(),
	fieldName: z.enum(['title', 'taskStackUuid', 'taskPriorityUuid', 'taskStatusUuid', 'assigneeUuid', 'description']),
});
