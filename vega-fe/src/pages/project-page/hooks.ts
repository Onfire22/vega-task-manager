import { format } from 'date-fns';
import { DATE_FORMAT, ROLES_COLORS, STATUSES } from './constants.ts';
import { useMemo } from 'react';
import { useUpdateProjectMutation } from '../../api/projects/projects.api.ts';
import { getAvatarColor, typedEntries } from '@/app/utils.ts';
import type { IDictionary, IDictionaryWithColor } from '@/pages/project-page/types.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useProject } from '@/api/projects/projects.hooks.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';

export const useProjectDictionaries = () => {
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(['PROJECT_STATUS', 'ROLE_TYPE']);

	if (!dictionariesOptions) return { projectStatusOptions: [], roleTypeOptions: [], isDictionariesLoading };

	const options = typedEntries(dictionariesOptions).reduce(
		(acc, [key, value]) => {
			const color = key === 'roleType' ? ROLES_COLORS : STATUSES;
			acc[key] = value.map((item: IDictionary) => {
				return {
					...item,
					color: color[item.key as keyof typeof color],
				};
			});

			return acc;
		},
		{} as Record<keyof typeof dictionariesOptions, Array<IDictionaryWithColor>>,
	);

	return {
		projectStatusOptions: options.projectStatus ?? [],
		roleTypeOptions: options.roleType ?? [],
		isDictionariesLoading,
	};
};

export const useProjectData = (uuid?: string) => {
	const { project, isProjectLoading } = useProject(uuid);

	const projectData = project
		? {
				...project,
				users: project?.users.map((user) => {
					return {
						id: user.id,
						userName: `${user.name} ${user.secondName}`,
						userSpecialisation: user.userSpecialisation.label,
						userInitials: `${user.name[0]} ${user.secondName[0]}`,
						color: getAvatarColor(user.id),
						userRole: {
							label: user.role.label,
							key: user.role.key,
							id: user.role.id,
						},
					};
				}),
				avatar: {
					letters: project.code.substring(1, 3),
					color: getAvatarColor(project.id),
				},
				createdAt: project?.createdAt ? format(project.createdAt, DATE_FORMAT) : '-',
				deadlineDate: project?.deadlineDate ? format(project.deadlineDate, DATE_FORMAT) : null,
			}
		: null;

	const projectTasks = project?.tasks ?? null;

	const projectProgress = useMemo(() => {
		if (!projectTasks) return 0;

		const totalTasks = projectTasks.length;

		const completedTasks = projectTasks.filter((task) => task.taskStatus.key === 'done').length;

		return (completedTasks / totalTasks) * 100;
	}, [projectTasks]);

	return {
		projectProgress,
		project: projectData,
		isProjectLoading: isProjectLoading,
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
	const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();

	const handleUpdateProject = (field: 'deadlineDate' | 'projectStatusUuid', value: string | Date) => {
		if (!uuid) return;
		updateProject({ uuid, field, value });
	};

	return {
		handleUpdateProject,
		isLoading,
		isSuccess,
	};
};

export const useUsersWithFilters = (searchValue: string, projectUuid?: string) => {
	const meta = {
		filters: {
			...(projectUuid ? { withOutProject: projectUuid } : {}),
			...(searchValue ? { search: searchValue } : {}),
		},
	};

	const { usersListOptions } = useUsersOptions(meta);

	return { usersListOptions };
};
