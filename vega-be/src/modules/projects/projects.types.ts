import { Project } from '../../generated/prisma/client';
import { DICTIONARY_SELECT, USER_SELECT } from '../../common/constants';
import { ProjectGetPayload } from '../../generated/prisma/models/Project';

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
	projects: Array<Omit<Project, 'memberships' | 'tasks' | 'description'>>;
}

export type ProjectWithDetails = ProjectGetPayload<{
	select: {
		id: true;
		title: true;
		createdAt: true;
		memberships: {
			select: {
				userRole: { select: { id: true; label: true } };
				user: { select: { id: true; name: true; secondName: true } };
			};
		};
		tasks: {
			select: {
				taskStatus: {
					select: { id: true; label: true; key: true };
				};
			};
		};
	};
}>;

export type TProjectTasks = ProjectWithDetails['tasks'][number];

export interface ICreateProjectRequestBody {
	title: string;
	description: string;
	deadlineDate: Date;
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

export interface IEditProjectResponse {
	projectUuid: string;
	field: 'deadlineDate' | 'projectStatusUuid';
	value: string;
	userRoleUuid: string;
}
