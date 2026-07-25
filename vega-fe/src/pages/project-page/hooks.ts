import { format } from 'date-fns';
import { DATE_FORMAT, ROLES_COLORS, STATUSES } from './constants.ts';
import { useMemo } from 'react';
import { useUpdateProjectMutation } from '@/api/projects/projects.api.ts';
import { getAvatarColor, typedEntries, useDebounce } from '@/app/utils.ts';
import type { IDictionary, IDictionaryWithColor, IProjectUserSelect } from '@/pages/project-page/types.ts';
import { useDictionariesOptions } from '@/api/dictionaries/dictionaries.hooks.ts';
import { useProject } from '@/api/projects/projects.hooks.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useParams } from 'react-router-dom';

export const useProjectDictionaries = () => {
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(['PROJECT_STATUS', 'ROLE_TYPE']);

	const options = useMemo(() => {
		if (!dictionariesOptions) return { projectStatus: [], roleType: [] };

		return typedEntries(dictionariesOptions).reduce(
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
	}, [dictionariesOptions]);

	return {
		projectStatusOptions: options.projectStatus ?? [],
		roleTypeOptions: options.roleType ?? [],
		isDictionariesLoading,
	};
};

export const useProjectData = () => {
	const params = useParams();

	const { project, isProjectLoading } = useProject(params.uuid);

	const projectData = useMemo(() => {
		if (!project) return null;

		return {
			...project,
			avatar: {
				letters: project.code.substring(1, 3),
				color: getAvatarColor(project.uuid),
			},
			createdAt: project?.createdAt ? format(project.createdAt, DATE_FORMAT) : '-',
			deadlineDate: project?.deadlineDate ? format(project.deadlineDate, DATE_FORMAT) : null,
		};
	}, [project]);

	return {
		projectData,
		isProjectLoading,
	};
};

export const useProjectUsers = () => {
	const { projectData, isProjectLoading } = useProjectData();

	const projectUsers = projectData?.users.reduce<{
		owner: Array<IProjectUserSelect>;
		users: Array<IProjectUserSelect>;
	}>(
		(acc, user) => {
			const accKey = user.role.key === 'owner' ? 'owner' : 'users';
			acc[accKey].push({
				uuid: user.uuid,
				userName: `${user.name} ${user.secondName}`,
				userSpecialisation: user.userSpecialisation.label,
				userInitials: `${user.name[0]} ${user.secondName[0]}`,
				color: getAvatarColor(user.uuid),
				avatarUrl: user.avatarUrl,
				userRole: {
					label: user.role.label,
					key: user.role.key,
					uuid: user.role.uuid,
				},
			});

			return acc;
		},
		{ owner: [], users: [] },
	);

	const usersList = [...(projectUsers?.owner ?? []), ...(projectUsers?.users ?? [])];

	return { usersList, canEdit: projectData?.canEdit, isProjectLoading };
};

export const useProjectProgress = () => {
	const { projectData } = useProjectData();

	const projectProgress = useMemo(() => {
		const projectTasks = projectData?.tasks ?? null;

		if (!projectTasks) return 0;

		const totalTasks = projectTasks.length;

		const completedTasks = projectTasks.filter((task) => task.taskStatus.key === 'done').length;

		return (completedTasks / totalTasks) * 100;
	}, [projectData]);

	return { projectProgress };
};

export const useProjectTasks = () => {
	const { projectData, isProjectLoading } = useProjectData();

	const tasks = projectData
		? projectData.tasks.map((item) => {
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

export const useUpdateProject = () => {
	const params = useParams();

	const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();

	const handleUpdateProject = (field: 'deadlineDate' | 'projectStatusUuid', value: string | Date) => {
		if (!params.uuid) return;
		updateProject({ uuid: params.uuid, field, value });
	};

	return {
		handleUpdateProject,
		isLoading,
		isSuccess,
	};
};

export const useUsersWithFilters = (searchValue: string) => {
	const params = useParams();

	const debouncedValue = useDebounce(searchValue, 1000);

	const meta = {
		filters: {
			...(params.uuid ? { withOutProject: params.uuid } : {}),
			...(debouncedValue ? { search: debouncedValue } : {}),
		},
	};

	const { usersListOptions } = useUsersOptions(meta);

	return { usersListOptions };
};
