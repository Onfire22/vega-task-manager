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

export interface IBaseDictionary {
	id: string;
	name: string;
}

export interface IStack extends IBaseDictionary {
	fullName: string;
	color: string;
}

export interface IDictionaryItem {
	label: string;
	value: string;
}

export interface IServerResponse<T> {
	success: boolean;
	payload: T[];
}

export interface ICreateTask {
	title: string;
	description: string;
	priorityUuid: string;
	stackUuid: string;
}

export interface ICreateTaskResponse extends ICreateTask {
	id: string;
	code: string | null;
	estimatedTime: string | null;
	loggedTime: string | null;
	assigneeUuid: string | null;
	reporterUuid: string;
	projectUuid: string | null;
	priorityUuid: string;
	statusUuid: string;
	stackUuid: string;
	createdAt: Date;
	updatedAt: Date;
}
