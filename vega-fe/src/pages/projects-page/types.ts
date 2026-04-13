export interface IDictionary {
	id: string;
	key: string;
	label: string;
}

export interface IProject {
	code: string;
	createdAt: string;
	id: string;
	owner: string;
	projectProgress: number;
	tasksCount: number;
	title: string;
	projectStatus: IDictionary;
	users: Array<{
		id: string;
		name: string;
		secondName: string;
		role: IDictionary;
	}>;
}
