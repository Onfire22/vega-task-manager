import { z } from 'zod';

export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const TaskResponseSchema = z.object({
	task: z.object({
		uuid: z.string(),
		code: z.string(),
		title: z.string(),
		description: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		buildLinks: z.string().nullable(),
		mrLinks: z.string().nullable(),
		taskPriority: z.object({
			uuid: z.string(),
			label: z.string(),
			key: z.string(),
		}),
		taskStatus: z.object({
			uuid: z.string(),
			label: z.string(),
			key: z.string(),
		}),
		taskStack: z.object({
			uuid: z.string(),
			label: z.string(),
			key: z.string(),
		}),
		reporter: z.object({
			uuid: z.string(),
			name: z.string(),
			secondName: z.string(),
		}),
		assignee: z
			.object({
				uuid: z.string(),
				name: z.string(),
				secondName: z.string(),
			})
			.nullable(),
		project: z.object({
			uuid: z.string(),
			code: z.string(),
			title: z.string(),
			projectStatus: z.object({
				key: z.string(),
				label: z.string(),
			}),
		}),
		logInfo: z.object({
			estimateTime: z
				.object({
					time: z.string().optional(),
					timeInPercents: z.number(),
				})
				.nullable(),
			remainingTime: z
				.object({
					time: z.string().optional(),
					timeInPercents: z.number(),
				})
				.nullable(),
			totalLoggedTime: z
				.object({
					time: z.string().optional(),
					timeInPercents: z.number(),
				})
				.nullable(),
		}),
	}),
});

export const TasksResponseSchema = z.object({
	tasks: z.array(
		z.object({
			uuid: z.string(),
			code: z.string(),
			title: z.string(),
			description: z.string(),
			remainingTime: z.object({}).nullable().optional(),
			taskPriority: z.object({
				uuid: z.string(),
				label: z.string(),
				key: z.string(),
			}),
			taskStatus: z.object({
				uuid: z.string(),
				label: z.string(),
				key: z.string(),
			}),
			taskStack: z.object({
				uuid: z.string(),
				label: z.string(),
				key: z.string(),
			}),
			createdAt: z.string(),
			updatedAt: z.string(),
			reporter: z.object({
				uuid: z.string(),
				name: z.string(),
				secondName: z.string(),
			}),
			assignee: z
				.object({
					uuid: z.string(),
					name: z.string(),
					secondName: z.string(),
				})
				.nullable(),
			logInfo: z.object({
				estimateTime: z
					.object({
						time: z.string().optional(),
						timeInPercents: z.number(),
					})
					.nullable(),
				remainingTime: z
					.object({
						time: z.string().optional(),
						timeInPercents: z.number(),
					})
					.nullable(),
				totalLoggedTime: z
					.object({
						time: z.string().optional(),
						timeInPercents: z.number(),
					})
					.nullable(),
			}),
		}),
	),
	meta: z.object({
		total: z.number().int(),
		page: z.number().int(),
		pageLimit: z.number().int(),
		hasPrev: z.boolean(),
		hasNext: z.boolean(),
		totalPages: z.number().int(),
	}),
});

export const UpdateTaskResponseSchema = z.object({
	task: z.string(),
});

export const CreateTaskResponseSchema = z.object({
	uuid: z.string(),
});
