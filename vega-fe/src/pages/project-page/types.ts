export interface IProjectUser {
	id: string;
	userName: string;
	userSpecialisation: string;
	userRole: {
		label: string;
		key: string;
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

export interface IProject {
	id: string;
	title: string;
	code: string;
	description: string;
	createdAt: string;
	deadlineDate: string | null;
	tasks: Array<IProjectTask>;
	users: Array<IProjectUser>;
	projectStatus: {
		description: string;
		id: string;
		label: string;
		key: string;
	};
}

export interface IDictionary {
	description: string;
	value: string;
	label: string;
	key: string;
}
