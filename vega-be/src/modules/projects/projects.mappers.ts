import { ProjectWithDetails } from './projects.types';

export const normalizeProject = (project: ProjectWithDetails) => {
	return {
		...project,
		memberships: project.memberships.map((item) => {
			return {
				user: {
					...item.user,
					role: item.userRole,
				},
			};
		}),
	};
};
