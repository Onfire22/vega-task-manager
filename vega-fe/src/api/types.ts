export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
	userStackUUid: string;
}

export interface IUserResponse {
	currentUser: IUserData;
}

export interface IAuthUserResponse {
	user: {
		email: string;
		id: string;
		name: string;
		secondName: string;
	};
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

export interface ITask extends ICreateTask {
	id: string;
	code: string | null;
	estimatedTime: string | null;
	loggedTime: string | null;
	assigneeUuid: string | null;
	reporterUuid: string;
	projectUuid: string | null;
	taskStatusUuid: string;
	createdAt: string;
	updatedAt: string;
}

export interface ITaskResponse {
	tasks: ITask[];
}

export type TDictionariesTypes = 'TASK_PRIORITY' | 'ROLE_TYPE' | 'STACK_TYPE' | 'TASK_STATUS';

export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export type IDictionariesResponse = {
	dictionaries: Partial<Record<Lowercase<TDictionariesTypes>, IDictionary[]>>;
};

export interface IUsers {
	usersList: Array<{
		id: string;
		name: string;
		secondName: string;
	}>;
}

export interface IProject {
	code: string;
	createdAt: Date;
	description: string;
	id: string;
	memberships: [{ userUuid: string; userRoleUuid: string }];
	title: string;
}

export interface IProjectCreate {
	title: string;
	description: string;
	usersUuids: string[];
}

export interface IDefaultResponse {
	success: boolean;
}

export type TDirection = 'desc' | 'asc';

export interface ISorting {
	column: string;
	direction: TDirection;
}

export interface IGetUserTasksRequest {
	filters: {
		isAssignee: boolean;
		sorting: ISorting;
	};
}

export interface IUpdateTaskStatusRequest {
	uuid: string;
	status: string;
}
