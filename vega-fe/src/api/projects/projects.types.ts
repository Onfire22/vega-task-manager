import { z } from 'zod';
import {
	BaseResponseSchema,
	CreateProjectResponseSchema,
	ProjectResponseSchema,
	ProjectsResponseSchema,
} from './projects.validation';

export interface IProjectCreate {
	title: string;
	description: string;
	usersUuids?: Array<string>;
	deadlineDate?: Date;
}

export interface IProjectsMeta {
	meta: {
		pagination: { pageLimit: number; page: number };
	};
}

export interface IProjectUpdateRequest {
	uuid: string;
	field: 'deadlineDate' | 'projectStatusUuid';
	value: string | Date;
}

export interface IUpdateUserRole {
	uuid: string;
	userUuid: string;
	userRole: string;
}

export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TCreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>;

export type TProjectResponse = z.infer<typeof ProjectResponseSchema>;

export type TProjectsResponse = z.infer<typeof ProjectsResponseSchema>;
