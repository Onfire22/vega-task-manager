import { z } from 'zod';

export const CreateTaskValidationSchema = z.object({
	title: z.string().min(5, 'Минимум 5 символов'),
	description: z.string().min(5, 'Минимум 5 символов'),
	taskStackUuid: z.string().min(1, 'Это обязательное поле'),
	taskPriorityUuid: z.string().min(1, 'Это обязательное поле'),
	taskProjectUuid: z.string().min(1, 'Это обязательное поле'),
});

export const CreateProjectValidationSchema = z.object({
	title: z.string().min(5, 'Минимум 5 символов'),
	description: z.string().min(5, 'Минимум 5 символов'),
	deadlineDate: z.date().optional(),
	usersUuids: z.array(z.string()).optional(),
});
