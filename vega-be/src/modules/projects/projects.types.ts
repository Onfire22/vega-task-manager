export interface IAssignee {
	id: string;
	name: string;
	secondName: string;
}

export interface IDictionary {
	color: string;
	id: string;
	name: string;
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: IAssignee | null;
	taskPriority: IDictionary;
	taskStatus: IDictionary;
	taskStack: IDictionary;
}

export interface IMemberShops {
	userRole: {
		id: string;
		name: string;
	};
	user: {
		id: string;
		name: string;
		secondName: string;
	};
}

export interface IProjectDB {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
	tasks: Array<ITask>;
	memberships: Array<IMemberShops>;
}

export interface IProjectsResponse {
	projects: Array<Omit<IProjectDB, 'memberships' | 'tasks' | 'description'>>;
}

export interface ICreateProjectRequestBody {
	title: string;
	description: string;
	usersUuids: Array<string>;
}

export interface IProjectsRequest {
	uuid: string;
}

export interface IMappedMembership {
	user: {
		id: string;
		name: string;
		secondName: string;
		role: {
			id: string;
			name: string;
		};
	};
}

export interface IProjectResponse {
	project: {
		id: string;
		title: string;
		description: string;
		createdAt: Date;
		tasks: Array<ITask>;
		memberships: Array<IMappedMembership>;
	};
}

export type TUpdateProjectRequest = Record<'title' | 'description', string>;
