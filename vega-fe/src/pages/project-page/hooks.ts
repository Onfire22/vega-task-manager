import { useDictionariesOptions, useProject } from '../../api/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import { useMemo } from 'react';
import { useGetCurrentUserQuery } from '../../api/queries/auth.api.ts';
import { useUpdateProjectMutation } from '../../api/queries/projects.api.ts';

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
							id: user.role.id,
						},
					};
				}),
				createdAt: project?.createdAt ? format(project.createdAt, DATE_FORMAT) : '-',
				deadlineDate: project?.deadlineDate ? format(project.deadlineDate, DATE_FORMAT) : null,
			}
		: null;

	const projectTasks = project?.tasks ?? null;

	const projectProgress = useMemo(() => {
		if (!projectTasks) return 0;

		const totalTasks = projectTasks.length;

		const completedTasks = projectTasks.filter((task) => task.taskStatus.label === 'completed').length;

		return (completedTasks / totalTasks) * 100;
	}, [projectTasks]);

	return {
		dictionariesOptions,
		projectProgress,
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

export const useUpdateProject = (uuid?: string) => {
	const { project } = useProjectData(uuid);
	const { data } = useGetCurrentUserQuery();
	const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();
	const userRoleUuid = project?.users.find((user) => user.id === data?.currentUser.id)?.userRole?.id;

	const handleUpdateProject = (field: 'deadlineDate' | 'projectStatusUuid', value: string) => {
		if (!uuid || !userRoleUuid) return;
		updateProject({ uuid, field, value, userRoleUuid });
	};

	return {
		handleUpdateProject,
		isLoading,
		isSuccess,
	};
};
