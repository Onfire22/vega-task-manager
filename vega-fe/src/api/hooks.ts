import { useGetDictionariesQuery } from './queries/dictionaries.api.ts';
import { CACHING_SETTINGS } from '../app/constants.ts';
import type { IFiltersRequest, IProjectsMeta, TDictionariesTypes } from './types.ts';
import { useGetUsersQuery } from './queries/users.api.ts';
import { useGetProjectByUuidQuery, useGetProjectsQuery } from './queries/projects.api.ts';
import { useGetTaskQuery } from './queries/tasks.api.ts';
import { transformDictionaries } from './utils.ts';
import { useMemo } from 'react';

export const useDictionaries = (meta: TDictionariesTypes[]) => {
	const { data, isLoading, isSuccess } = useGetDictionariesQuery(meta, CACHING_SETTINGS);

	const dictionaries = isSuccess ? data.dictionaries : {};

	return { dictionaries, isDictionariesLoading: isLoading };
};

export const useDictionariesOptions = (meta: TDictionariesTypes[]) => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(meta);

	const dictionariesOptions = useMemo(() => {
		return (Object.keys(dictionaries) as Array<keyof typeof dictionaries>).reduce(
			(acc, key) => {
				if (dictionaries[key]) {
					return {
						...acc,
						[key]: transformDictionaries(dictionaries[key]),
					};
				}
				return acc;
			},
			{} as Record<keyof typeof dictionaries, ReturnType<typeof transformDictionaries>>,
		);
	}, [dictionaries]);

	return { dictionariesOptions, isDictionariesLoading };
};

export const useUsers = (filters: IFiltersRequest, skip = false) => {
	const { data, isLoading, isSuccess } = useGetUsersQuery(filters, { skip });

	const usersList = isSuccess ? data.usersList : [];

	return { usersList, isUsersLoading: isLoading };
};

export const useUsersOptions = (filters: IFiltersRequest, skip = false) => {
	const { usersList, isUsersLoading } = useUsers(filters, skip);

	const usersListOptions = usersList.map((user) => ({
		label: `${user.name} ${user.secondName}`,
		value: user.id,
	}));

	return { usersListOptions, isUsersLoading };
};

export const useProjects = (meta: IProjectsMeta) => {
	const { data, isLoading, isSuccess } = useGetProjectsQuery(meta);

	const projectsList = isSuccess ? data.projects : [];

	return { projectsList, meta: data?.meta, isProjectsLoading: isLoading };
};

export const useProjectsOptions = (meta: IProjectsMeta) => {
	const { projectsList, isProjectsLoading } = useProjects(meta);

	const projectOptions = projectsList.map((project) => ({
		label: project.title,
		value: project.id,
	}));

	return { projectOptions, isProjectsLoading };
};

export const useTask = (uuid?: string) => {
	const { data, isLoading, isSuccess } = useGetTaskQuery(uuid!, { skip: !uuid });

	const task = isSuccess ? data.task : null;

	return { task, isTaskLoading: isLoading };
};

export const useProject = (uuid?: string) => {
	const { data, isLoading, isSuccess } = useGetProjectByUuidQuery(uuid!, { skip: !uuid });

	const project = isSuccess ? data.project : null;

	return { project, isProjectLoading: isLoading };
};
