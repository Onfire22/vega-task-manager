import { ProjectGetPayload } from '../../generated/prisma/models/Project';
import {
	CreateProjectBodySchema,
	EditProjectBodySchema,
	GetProjectsResponseSchema,
	ProjectParamsSchema,
} from './projects.validation';
import { z } from 'zod';

export type ProjectWithDetails = ProjectGetPayload<{
	select: {
		uuid: true;
		title: true;
		createdAt: true;
		memberships: {
			select: {
				userRole: { select: { uuid: true; label: true; key: true } };
				user: { select: { uuid: true; name: true; secondName: true } };
			};
		};
		tasks: {
			select: {
				taskStatus: {
					select: { uuid: true; label: true; key: true };
				};
			};
		};
	};
}>;

export interface IPagination {
	pageLimit: number;
	page: number;
}

export interface INotification {
	fromUserUuid: string;
	entityType: 'PROJECT';
	extraData: string;
}

export type TProjectTasks = ProjectWithDetails['tasks'][number];

export type TCreateProjectBody = z.infer<typeof CreateProjectBodySchema>;

export type TProjectParams = z.infer<typeof ProjectParamsSchema>;

export type TEditProjectBody = z.infer<typeof EditProjectBodySchema>;

export type TGetProjectsBody = z.infer<typeof GetProjectsResponseSchema>;
