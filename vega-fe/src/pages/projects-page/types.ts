export interface IDictionary {
	uuid: string;
	key: string;
	label: string;
}

export interface IProject {
	code: string;
	createdAt: string;
	uuid: string;
	owner: string;
	projectProgress: number;
	tasksCount: number;
	title: string;
	projectStatus: IDictionary;
	users: Array<{
		uuid: string;
		name: string;
		secondName: string;
		role: IDictionary;
	}>;
}
