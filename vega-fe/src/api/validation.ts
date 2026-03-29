import { z } from 'zod';

// email, logout, RUD comment, upd user role, upd project, createTask
export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const SignUpUserResponseSchema = z.object({
	user: z.object({
		email: z.string(),
		id: z.string(),
		name: z.string(),
		secondName: z.string(),
		userSpecialisationUuid: z.string(),
		userName: z.string(),
	}),
});

export const SigInUserResponseSchema = z.object({
	user: z.object({
		email: z.string(),
		id: z.string(),
		name: z.string(),
		secondName: z.string(),
	}),
});

export const CurrentUserResponseSchema = z.object({
	currentUser: z.object({
		id: z.string(),
		email: z.string(),
		name: z.string(),
		secondName: z.string(),
		userName: z.string(),
		userSpecialisation: z.object({
			id: z.string(),
			label: z.string(),
			key: z.string(),
		}),
	}),
});

export const DictionarySchema = z.array(
	z.object({
		id: z.string(),
		label: z.string(),
		key: z.string(),
		description: z.string().nullable(),
	}),
);

export const DictionariesResponseSchema = z.object({
	dictionaries: z.object({
		taskPriority: DictionarySchema.optional(),
		taskStatus: DictionarySchema.optional(),
		taskType: DictionarySchema.optional(),
		roleType: DictionarySchema.optional(),
		userSpecialisation: DictionarySchema.optional(),
		projectStatus: DictionarySchema.optional(),
	}),
});

export const CommentsResponseSchema = z.object({
	comments: z.array(
		z.object({
			id: z.string(),
			text: z.string(),
			createdAt: z.string(),
			updatedAt: z.string(),
			author: z.object({
				id: z.string(),
				name: z.string(),
				secondName: z.string(),
			}),
		}),
	),
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
});

export const CreateProjectResponseSchema = z.object({
	project: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		code: z.string(),
		projectStatusUuid: z.string(),
		deadlineDate: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
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

export const UsersResponseSchema = z.object({
	usersList: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			secondName: z.string(),
		}),
	),
});

export const TasksResponseSchema = z.object({
	tasks: z.array(
		z.object({
			id: z.string(),
			code: z.string(),
			title: z.string(),
			description: z.string(),
			remainingTime: z.object({}).nullable().optional(),
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
			timeLogs: z.array(z.any()).optional(),
			estimateTime: z.object({}).nullable().optional(),
			createdAt: z.string(),
			totalLoggedTime: z
				.object({
					minutes: z.string(),
				})
				.optional(),
			estimateTimeInSecs: z.number().int().nullable().optional(),
			remainingTimeInSecs: z.number().int().nullable().optional(),
			totalLoggedTimeInSecs: z.number().int().nullable().optional(),
		}),
	),
});

export const TaskResponseSchema = z.object({
	task: z.object({
		id: z.string(),
		code: z.string(),
		title: z.string(),
		description: z.string(),
		estimateTime: z.object({ hours: z.string(), minutes: z.string() }).nullable(),
		remainingTime: z.object({ hours: z.string(), minutes: z.string() }).nullable(),
		totalLoggedTime: z.object({ hours: z.string(), minutes: z.string() }).nullable(),
		createdAt: z.string(),
		updatedAt: z.string(),
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
		reporter: z.object({
			id: z.string(),
			name: z.string(),
			secondName: z.string(),
		}),
		assignee: z
			.object({
				id: z.string(),
				name: z.string(),
				secondName: z.string(),
			})
			.nullable(),
		timeLogs: z.array(z.any()),
		project: z.object({
			id: z.string(),
			code: z.string(),
			title: z.string(),
			projectStatus: z.object({
				key: z.string(),
				label: z.string(),
			}),
		}),
		totalLoggedTimeInSecs: z.number().int().nullable(),
		estimateTimeInSecs: z.number().int().nullable(),
		remainingTimeInSecs: z.number().int().nullable(),
	}),
});

export const UpdateTaskResponseSchema = z.object({
	task: z.object({
		id: z.string(),
		code: z.string(),
		title: z.string(),
		description: z.string(),
		estimateTime: z.null().optional(),
		remainingTime: z.null().optional(),
		assigneeUuid: z.string(),
		reporterUuid: z.string(),
		projectUuid: z.string(),
		taskPriorityUuid: z.string(),
		taskStatusUuid: z.string(),
		taskStackUuid: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
});

export const UpdateUserResponseSchema = z.object({
	newUser: z.object({
		id: z.string(),
		name: z.string(),
		secondName: z.string(),
		email: z.string(),
		password: z.string(),
		userName: z.string(),
		userSpecialisationUuid: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
});
