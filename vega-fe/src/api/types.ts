export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
	userStackUuid: string;
}

export interface ICurrentUser {
	email: string;
	id: string;
	name: string;
	secondName: string;
}

export interface IUserResponse {
	currentUser: ICurrentUser;
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

export type TDictionariesTypes = 'TASK_PRIORITY' | 'ROLE_TYPE' | 'STACK_TYPE' | 'TASK_STATUS';

type TDictionariesMapped = 'taskPriority' | 'roleType' | 'stackType' | 'taskStatus';

export interface IDictionary {
	id: string;
	name: string;
	color: string | null;
	fullName: string | null;
}

export type IDictionariesResponse = {
	dictionaries: Partial<Record<TDictionariesMapped, IDictionary[]>>;
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

export interface IExpDictData {
	color: string;
	id: string;
	name: string;
}

export interface IExpUserDict {
	id: string;
	name: string;
	secondName: string;
}

export interface IExpTaskResponse {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimatedTime: string | null;
	loggedTime: string | null;
	assignee: IExpUserDict | null;
	reporter: IExpUserDict;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}

export interface ITaskList {
	id: string;
	code: string | null;
	title: string;
	estimatedTime: string | null;
	loggedTime: string | null;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
}

export type TTaskList = { tasks: Array<ITaskList> };
