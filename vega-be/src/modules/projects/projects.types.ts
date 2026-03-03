export interface IMembership {
	userUuid: string;
	userRoleUuid: string;
}

export interface IProject {
	id: string;
	title: string;
	description: string;
	code: string;
	createdAt: Date;
	memberships: Array<IMembership>;
}

export interface IProjectsResponse {
	projects: Array<IProject>;
}

export interface ICreateProjectRequestBody {
	title: string;
	description: string;
	usersUuids: Array<string>;
}
