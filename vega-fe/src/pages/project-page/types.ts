export interface IProjectUser {
	id: string;
	userName: string;
	userSpecialisation: string;
	userInitials: string;
	color: string;
	userRole: {
		label: string;
		key: string;
		id: string;
	};
}

export interface ITaskDictionary {
	id: string;
	label: string;
}

export interface IProjectTask {
	assignee: {
		id: string;
		name: string;
		secondName: string;
	} | null;
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
	canEdit: boolean;
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
