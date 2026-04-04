import { z } from 'zod';
import {
	BaseResponseSchema,
	CommentsResponseSchema,
	CreateProjectResponseSchema,
	CreateTaskResponseSchema,
	CurrentUserResponseSchema,
	DictionariesResponseSchema,
	DictionarySchema,
	GetTaskLogsResponseSchema,
	ProjectResponseSchema,
	ProjectsResponseSchema,
	SigInUserResponseSchema,
	SignUpUserResponseSchema,
	TaskResponseSchema,
	TasksResponseSchema,
	UpdateTaskResponseSchema,
	UpdateUserResponseSchema,
	UsersResponseSchema,
} from '@/api/validation.ts';

export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
	userSpecialisationUuid: string;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface ICreateTask {
	title: string;
	description: string;
	taskPriorityUuid: string;
	taskStackUuid: string;
}

export type TDictionariesTypes =
	| 'TASK_PRIORITY'
	| 'ROLE_TYPE'
	| 'USER_SPECIALISATION'
	| 'TASK_STATUS'
	| 'TASK_TYPE'
	| 'PROJECT_STATUS';

export interface IProjectCreate {
	title: string;
	description: string;
	usersUuids?: string[];
	deadlineDate?: Date;
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

export interface IProjectUpdateRequest {
	uuid: string;
	field: 'deadlineDate' | 'projectStatusUuid';
	value: string | Date;
	userRoleUuid: string;
}

export interface IUpdateUserRole {
	uuid: string;
	userUuid: string;
	userRole: string;
}

export interface ICommentCreateBody {
	taskUuid: string;
	text: string;
}

export interface IEditCommentPayload {
	commentUuid: string;
	text: string;
}

export interface IFiltersRequest {
	filters: Partial<{
		withOutProject: string;
		withProject: string;
		withoutUser: string;
	}>;
}

export type TUpdateTaskFields =
	| 'title'
	| 'taskStackUuid'
	| 'taskPriorityUuid'
	| 'taskStatusUuid'
	| 'assigneeUuid'
	| 'description';

export interface TUpdateTaskRequest {
	fieldName: TUpdateTaskFields;
	value: string;
	uuid: string;
}

export interface IUpdateUserRequest {
	name?: string;
	secondName?: string;
	userSpecialisationUuid?: string;
}

export interface IUpdatePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export interface IUpdateTaskEstimate {
	value: string;
	uuid: string;
}

export interface IProjectsMeta {
	meta: {
		pagination: { pageLimit: number; page: number };
	};
}

export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TSignUpResponse = z.infer<typeof SignUpUserResponseSchema>;

export type TSignInResponse = z.infer<typeof SigInUserResponseSchema>;

export type TCurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;

export type TDictionariesResponse = z.infer<typeof DictionariesResponseSchema>;

export type TCommentsResponse = z.infer<typeof CommentsResponseSchema>;

export type TProjectsResponse = z.infer<typeof ProjectsResponseSchema>;

export type TCreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>;

export type TProjectResponse = z.infer<typeof ProjectResponseSchema>;

export type TUsersResponse = z.infer<typeof UsersResponseSchema>;

export type TTasksResponse = z.infer<typeof TasksResponseSchema>;

export type TTaskResponse = z.infer<typeof TaskResponseSchema>;

export type UpdateTaskResponse = z.infer<typeof UpdateTaskResponseSchema>;

export type TDictionary = z.infer<typeof DictionarySchema>;

export type TUpdateUser = z.infer<typeof UpdateUserResponseSchema>;

export type TCreateTaskResponse = z.infer<typeof CreateTaskResponseSchema>;

export type TGetTaskLogsResponse = z.infer<typeof GetTaskLogsResponseSchema>;
