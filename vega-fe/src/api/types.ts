export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface IDictionaryItem {
	label: string;
	value: string;
}

export interface ICreateTask {
	title: string;
	description: string;
	taskPriorirtyUuid: string;
	taskStackUuid: string;
}

export interface ITask extends ICreateTask {
	id: string;
	code: string | null;
	estimatedTime: string | null;
	loggedTime: string | null;
	assigneeUuid: string | null;
	taskReporterUuid: string;
	projectUuid: string | null;
	taskStatusUuid: string;
	createdAt: string;
	updatedAt: string;
}

export type TDictionariesTypes = 'TASK_PRIORITY' | 'ROLE_TYPE' | 'STACK_TYPE' | 'TASK_STATUS';

export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export type TPayload = Record<Lowercase<TDictionariesTypes>, IDictionary[]>;

export interface IDictionariesResponse {
	success: boolean;
	payload: TPayload;
}
