import z from 'zod';

export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const CreateProjectResponseSchema = z.object({
	id: z.string(),
});

export const ProjectResponseSchema = z.object({
	project: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		createdAt: z.string(),
		code: z.string(),
		canEdit: z.boolean(),
		deadlineDate: z.string(),
		projectStatus: z.object({
			label: z.string(),
			description: z.string(),
			id: z.string(),
			key: z.string(),
		}),
		tasks: z.array(
			z.object({
				id: z.string(),
				code: z.string(),
				title: z.string(),
				createdAt: z.string(),
				taskPriority: z.object({
					id: z.string(),
					label: z.string(),
					key: z.string(),
				}),
				taskStatus: z.object({
					id: z.string(),
					label: z.string(),
					key: z.string(),
				}),
				taskStack: z.object({
					id: z.string(),
					label: z.string(),
					key: z.string(),
				}),
				assignee: z
					.object({
						id: z.string(),
						name: z.string(),
						secondName: z.string(),
					})
					.nullable(),
			}),
		),
		users: z.array(
			z.object({
				id: z.string(),
				name: z.string(),
				secondName: z.string(),
				avatarUrl: z.string().nullable(),
				userSpecialisation: z.object({
					label: z.string(),
				}),
				role: z.object({
					id: z.string(),
					label: z.string(),
					key: z.string(),
				}),
			}),
		),
	}),
});

export const ProjectsResponseSchema = z.object({
	projects: z.array(
		z.object({
			id: z.string(),
			code: z.string(),
			title: z.string(),
			createdAt: z.string(),
			projectStatus: z.object({
				id: z.string(),
				key: z.string(),
				label: z.string(),
			}),
			users: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					secondName: z.string(),
					role: z.object({
						id: z.string(),
						label: z.string(),
						key: z.string(),
					}),
				}),
			),
			projectProgress: z.union([z.number().int(), z.number()]),
			tasksCount: z.number().int(),
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
