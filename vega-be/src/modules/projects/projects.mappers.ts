import { IProjectDB } from './projects.types';

export const normalizeProject = (project: IProjectDB) => {
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
