export interface IProjectUser {
	id: string;
	userName: string;
	userSpecialisation: string;
	userRole: {
		label: string;
		key: string;
	};
}

export interface IProject {
	id: string;
	title: string;
	code: string;
	description: string;
	createdAt: string;
	deadline?: string;
	tasks: [];
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
