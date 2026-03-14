import { useDictionariesOptions, useProject } from '../../api/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const useProjectData = (uuid?: string) => {
	const { project, isProjectLoading } = useProject(uuid);
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(['PROJECT_STATUS']);

	const projectData = project
		? {
				...project,
				users: project?.users.map((user) => {
					return {
						id: user.id,
						userName: `${user.name} ${user.secondName}`,
						userSpecialisation: user.userSpecialisation.label,
						userRole: {
							label: user.role.label,
							key: user.role.key,
						},
					};
				}),
				createdAt: project?.createdAt ? format(project.createdAt, DATE_FORMAT) : '-',
				deadline: project?.deadline ? format(project.deadline, DATE_FORMAT) : '-',
			}
		: null;

	return {
		dictionariesOptions,
		project: projectData,
		isProjectLoading: isProjectLoading || isDictionariesLoading,
	};
};

export const useProjectTasks = (uuid?: string) => {
	const { project, isProjectLoading } = useProject(uuid);

	const tasks = project
		? project.tasks.map((item) => {
				return {
					...item,
					createdAt: format(item.createdAt, DATE_FORMAT),
				};
			})
		: [];

	return {
		tasks,
		isProjectLoading,
	};
};
