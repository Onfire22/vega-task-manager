import { CreateTaskBodySchema, TaskParamsSchema, UpdateTaskBodySchema, UserTasksBodySchema } from './tasks.validation';
import { z } from 'zod';
import { Prisma } from '../../generated/prisma/client';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';

export interface ITime {
	hours: string;
	minutes: string;
}

export interface ITaskLog {
	estimateTime: { time: Partial<ITime>; timeInPercents: number } | null;
	remainingTime: { time: Partial<ITime>; timeInPercents: number } | null;
	totalLoggedTime: { time: Partial<ITime>; timeInPercents: number } | null;
}

export type TPrismaTask = Prisma.TaskGetPayload<{
	select: {
		id: true;
		code: true;
		title: true;
		description: true;
		estimateTime: true;
		remainingTime: true;
		createdAt: true;
		updatedAt: true;
		taskPriority: {
			select: typeof DICTIONARY_SELECT;
		};
		taskStatus: {
			select: typeof DICTIONARY_SELECT;
		};
		taskStack: {
			select: typeof DICTIONARY_SELECT;
		};
		reporter: {
			select: typeof USER_SELECT;
		};
		assignee: {
			select: typeof USER_SELECT;
		};
		timeLogs: {
			select: {
				id: true;
				loggedTime: true;
				description: true;
				user: { select: { name: true; secondName: true; id: true } };
				createdAt: true;
				updatedAt: true;
			};
		};
		project: {
			select: {
				id: true;
				code: true;
				title: true;
				projectStatus: {
					select: {
						key: true;
						label: true;
					};
				};
			};
		};
	};
}>;

export type TaskListItem = Prisma.TaskGetPayload<{
	select: {
		id: true;
		code: true;
		title: true;
		description: true;
		remainingTime: true;
		taskPriority: {
			select: typeof DICTIONARY_SELECT;
		};
		taskStatus: {
			select: typeof DICTIONARY_SELECT;
		};
		taskStack: {
			select: typeof DICTIONARY_SELECT;
		};
		timeLogs: {
			select: {
				id: true;
				loggedTime: true;
				description: true;
				user: true;
				createdAt: true;
				updatedAt: true;
			};
		};
		estimateTime: true;
		createdAt: true;
	};
}>;

export type TCreateTaskBody = z.infer<typeof CreateTaskBodySchema>;

export type TUserTasksBody = z.infer<typeof UserTasksBodySchema>;

export type TTaskParams = z.infer<typeof TaskParamsSchema>;

export type TUpdateTaskBody = z.infer<typeof UpdateTaskBodySchema>;
