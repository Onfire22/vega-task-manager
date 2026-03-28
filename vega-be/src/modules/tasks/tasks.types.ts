import {
	CreateTaskBodySchema,
	TaskParamsSchema,
	UpdateTaskBodySchema,
	UpdateTaskTimeBodySchema,
	UserTasksBodySchema,
} from './tasks.validation';
import { z } from 'zod';

export interface ITimeLog {
	id: string;
	description: string | null;
	loggedTime: number | null;
	user: {
		id: string;
		name: string;
		secondName: string | null;
	};
	createdAt: Date;
	updatedAt?: Date;
}

export interface IExpDictData {
	color?: string | null;
	id: string;
	name: string;
}

export interface IExpUserDict {
	id: string;
	name: string;
	secondName: string | null;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimateTime: number | null;
	remainingTime: number | null;
	timeLogs: Array<ITimeLog>;
	assignee: IExpUserDict | null;
	reporter: IExpUserDict;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: Date;
	updatedAt: Date;
}

export interface ITime {
	hours: string;
	minutes: string;
}

export type ITaskTransformed = Omit<ITask, 'estimateTime' | 'timeLogs'> & {
	estimateTime: Partial<ITime> | null;
	timeLogs: Array<
		Omit<ITimeLog, 'loggedTime'> & {
			loggedTime: Partial<ITime> | null;
		}
	>;
};

export type TCreateTaskBody = z.infer<typeof CreateTaskBodySchema>;

export type TUserTasksBody = z.infer<typeof UserTasksBodySchema>;

export type TTaskParams = z.infer<typeof TaskParamsSchema>;

export type TUpdateTaskBody = z.infer<typeof UpdateTaskBodySchema>;

export type TUpdateTaskTimeBody = z.infer<typeof UpdateTaskTimeBodySchema>;
