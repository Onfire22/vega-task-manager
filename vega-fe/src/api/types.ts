export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
	userSpecialisationUuid: string;
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

export type TDictionariesTypes =
	| 'TASK_PRIORITY'
	| 'ROLE_TYPE'
	| 'USER_SPECIALISATION'
	| 'TASK_STATUS'
	| 'TASK_TYPE'
	| 'PROJECT_STATUS';

type TDictionariesMapped =
	| 'taskPriority'
	| 'roleType'
	| 'userSpecialisation'
	| 'taskStatus'
	| 'taskType'
	| 'projectStatus';

export interface IDictionary {
	description: string;
	id: string;
	label: string;
	key: string;
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
	id: string;
	label: string;
}

export interface IExpUserDict {
	id: string;
	name: string;
	secondName: string;
}

export interface ITimeLog {
	description: string | null;
	id: string;
	loggedTime: Partial<{ minutes: string; hours: string }>;
	createdAt: string;
	updatedAt: string;
	user: {
		id: string;
		name: string;
		secondName: string;
	};
}

export interface IExpTaskResponse {
	id: string;
	code: string | null;
	title: string;
	description: string;
	estimateTimeInSecs: number;
	remainingTimeInSecs: number;
	totalLoggedTimeInSecs: number;
	estimateTime: Partial<{ minutes: string; hours: string }> | null;
	remainingTime: Partial<{ minutes: string; hours: string }> | null;
	totalLoggedTime: Partial<{ minutes: string; hours: string }> | null;
	timeLogs: Array<ITimeLog>;
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
	estimateTime: Partial<{ minutes: string; hours: string }> | null;
	timeLogs: Array<ITimeLog> | null;
	description: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
}

export type TTaskList = { tasks: Array<ITaskList> };

export interface IProjectUser {
	id: string;
	name: string;
	secondName: string;
	role: {
		id: string;
		label: string;
		key: string;
	};
	userSpecialisation: {
		label: string;
	};
}

export interface ITaskDictionary {
	id: string;
	label: string;
}

export interface IProjectTask {
	assignee: string | null;
	code: string | null;
	createdAt: string;
	id: string;
	taskPriority: ITaskDictionary;
	taskStack: ITaskDictionary;
	taskStatus: ITaskDictionary;
	title: string;
}

export interface IProjectResponse {
	project: {
		id: string;
		title: string;
		code: string;
		description: string;
		createdAt: string;
		deadline?: string;
		tasks: Array<IProjectTask>;
		users: Array<IProjectUser>;
		projectStatus: {
			description: string;
			id: string;
			label: string;
			key: string;
		};
	};
}

export interface ICreateProjectResponse {
	project: {
		code: string;
		createdAt: string;
		description: string;
		id: string;
		projectStatusUuid: string;
		title: string;
		updatedAt: string;
	};
}
