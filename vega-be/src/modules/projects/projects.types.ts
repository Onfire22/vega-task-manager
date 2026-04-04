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
		id: true;
		title: true;
		createdAt: true;
		memberships: {
			select: {
				userRole: { select: { id: true; label: true; key: true } };
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

export interface IPagination {
	pageLimit: number;
	page: number;
}

export type TProjectTasks = ProjectWithDetails['tasks'][number];

export type TCreateProjectBody = z.infer<typeof CreateProjectBodySchema>;

export type TProjectParams = z.infer<typeof ProjectParamsSchema>;

export type TEditProjectBody = z.infer<typeof EditProjectBodySchema>;

export type TGetProjectsBody = z.infer<typeof GetProjectsResponseSchema>;
