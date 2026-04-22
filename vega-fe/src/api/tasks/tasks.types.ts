import {
	BaseResponseSchema,
	CreateTaskResponseSchema,
	TaskResponseSchema,
	TasksResponseSchema,
	UpdateTaskResponseSchema,
} from './tasks.validation';
import { z } from 'zod';

export interface ICreateTask {
	title: string;
	description: string;
	taskPriorityUuid: string;
	taskStackUuid: string;
}

export type TDirection = 'desc' | 'asc';

export interface ISorting {
	column: string;
	direction: TDirection;
}

export interface IFilters {
	taskPriorityUuid?: Array<string>;
	taskStatusUuid?: Array<string>;
	taskStackUuid?: Array<string>;
}

export interface IGetUserTasksRequest {
	isAssignee: boolean;
	sorting: ISorting;
	filters: IFilters;
}

export interface IUpdateTaskEstimate {
	value: string;
	uuid: string;
}

export type TUpdateTaskFields =
	| 'title'
	| 'taskStackUuid'
	| 'taskPriorityUuid'
	| 'taskStatusUuid'
	| 'assigneeUuid'
	| 'description'
	| 'mrLinks'
	| 'buildLinks';

export type TUpdateTaskFieldsDTO = Partial<Record<TUpdateTaskFields, string>>;

export interface TUpdateTaskRequest {
	fields: TUpdateTaskFieldsDTO;
	uuid: string;
}

export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TCreateTaskResponse = z.infer<typeof CreateTaskResponseSchema>;

export type TTaskResponse = z.infer<typeof TaskResponseSchema>;

export type TTasksResponse = z.infer<typeof TasksResponseSchema>;

export type UpdateTaskResponse = z.infer<typeof UpdateTaskResponseSchema>;
