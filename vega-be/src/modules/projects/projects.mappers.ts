import { ProjectWithDetails } from './projects.types';

export const normalizeProject = (project: ProjectWithDetails) => {
	const { memberships, ...rest } = project;
	return {
		...rest,
		users: memberships.map((item) => {
			return {
				...item.user,
				role: item.userRole,
			};
		}),
	};
};
