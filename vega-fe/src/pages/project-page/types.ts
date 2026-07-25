export interface IUserRole {
	label: string;
	key: string;
	uuid: string;
}

export interface IProjectUser {
	uuid: string;
	name: string;
	secondName: string;
	userSpecialisation: {
		label: string;
	};
	role: IUserRole;
}

export interface ITaskDictionary {
	uuid: string;
	label: string;
}

export interface IProjectTask {
	assignee: {
		uuid: string;
		name: string;
		secondName: string;
	} | null;
	code: string | null;
	createdAt: string;
	uuid: string;
	taskPriority: ITaskDictionary;
	taskStack: ITaskDictionary;
	taskStatus: ITaskDictionary;
	title: string;
}

export interface IProject {
	uuid: string;
	title: string;
	code: string;
	canEdit: boolean;
	description: string;
	createdAt: string;
	deadlineDate: string | null;
	tasks: Array<IProjectTask>;
	users: Array<IProjectUser>;
	projectStatus: {
		description: string;
		uuid: string;
		label: string;
		key: string;
	};
	avatar: { letters: string; color: string };
}

export interface IDictionary {
	description: string | null;
	value: string;
	label: string;
	key: string;
}

export interface IDictionaryWithColor extends IDictionary {
	color: string;
}

export interface IUserModalInfo {
	userName: string;
	userUuid: string;
	userRoleUuid: string;
}

export interface IInitialState {
	modalInfo: IUserModalInfo | null;
}

export type TActiveFiled = 'deadlineDate' | 'projectStatusUuid';

export interface IField {
	fieldName: string;
	value: string | null;
}

export interface IProjectUserSelect {
	uuid: string;
	color: string;
	userInitials: string;
	userName: string;
	userSpecialisation: string;
	avatarUrl: string | null;
	userRole: IUserRole;
}
