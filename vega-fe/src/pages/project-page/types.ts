export interface IProjectUser {
	id: string;
	name: string;
	secondName: string;
	role: {
		id: string;
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
	tasks: [];
	users: Array<IProjectUser>;
}
